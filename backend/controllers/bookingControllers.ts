import Booking, { IBooking } from "../models/booking";
import { NextRequest, NextResponse } from "next/server";

import ErrorHandler from "../utils/errorHandler";
import Moment from "moment";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = body;
  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  return NextResponse.json({
    booking,
  });
});

export const checkRoomBookingAvailability = catchAsyncErrors(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    const checkInDate = new Date(searchParams.get("checkInDate") as string);
    const checkOutDate = new Date(searchParams.get("checkOutDate") as string);

    const bookings: IBooking[] = await Booking.find({
      room: roomId,
      $and: [
        { checkInDate: { $lte: checkOutDate } },
        { checkOutDate: { $gte: checkInDate } },
      ],
    });

    const isAvailable: boolean = bookings.length === 0;

    return NextResponse.json({
      isAvailable,
    });
  }
);

export const getRoomBookedDates = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const bookings = await Booking.find({
    room: roomId,
  });

  const bookedDates = bookings.flatMap((booking) =>
    Array.from(
      moment
        .range(moment(booking.checkInDate), moment(booking.checkOutDate))
        .by("day")
    )
  );

  return NextResponse.json({
    bookedDates,
  });
});

export const getMyBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find({
    user: req.user._id,
  });

  return NextResponse.json({
    bookings,
  });
});

export const getBookingDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id).populate([
      "user",
      "room",
    ]);

    if (
      booking.user?._id?.toString() !== req.user._id &&
      req?.user?.role !== "admin"
    ) {
      throw new ErrorHandler("You can not view this booking", 403);
    }

    return NextResponse.json({
      booking,
    });
  }
);

export const getAllAdminBookings = catchAsyncErrors(
  async (req: NextRequest) => {
    const bookings = await Booking.find();

    return NextResponse.json({
      bookings,
    });
  }
);

const getLastSixMonthsSales = async () => {
  const lastSixMonthsSales: any = [];

  const currentDate = moment();

  async function fetchSalesForMonth(
    startDate: moment.Moment,
    endDate: moment.Moment
  ) {
    const result = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$amountPaid" },
          numOfBookings: { $sum: 1 },
        },
      },
    ]);

    const { totalSales, numOfBookings } =
      result?.length > 0 ? result[0] : { totalSales: 0, numOfBookings: 0 };

    lastSixMonthsSales.push({
      monthName: startDate.format("MMMM"),
      totalSales,
      numOfBookings,
    });
  }

  for (let i = 0; i < 6; i++) {
    const startDate = moment(currentDate).startOf("month");
    const endDate = moment(currentDate).endOf("month");

    await fetchSalesForMonth(startDate, endDate);

    currentDate.subtract(1, "months");
  }

  return lastSixMonthsSales;
};

const getTopPerformingRooms = async (startDate: Date, endDate: Date) => {
  const topRooms = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$room",
        bookingsCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        bookingsCount: -1,
      },
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "_id",
        as: "roomData",
      },
    },
    {
      $unwind: "$roomData",
    },
    {
      $project: {
        _id: 0,
        roomName: "$roomData.name",
        bookingsCount: 1,
      },
    },
  ]);

  return topRooms;
};

export const getSalesStats = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { searchParams } = new URL(req.url);

    const startDate = new Date(searchParams.get("startDate") as string);
    const endDate = new Date(searchParams.get("endDate") as string);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const numberOfBookings = bookings.length;
    const totalSales = bookings.reduce(
      (acc, booking) => acc + booking.amountPaid,
      0
    );

    const sixMonthsSalesData = await getLastSixMonthsSales();
    const topRooms = await getTopPerformingRooms(startDate, endDate);

    return NextResponse.json({
      numberOfBookings,
      totalSales,
      sixMonthsSalesData,
      topRooms,
    });
  }
);

export const deleteBooking = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id);

    if (!booking) {
      throw new ErrorHandler("Booking not found with this ID", 404);
    }

    await booking?.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
