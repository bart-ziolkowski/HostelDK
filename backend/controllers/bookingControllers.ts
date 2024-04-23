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
    const booking = await Booking.findById({
      user: req.user._id,
    }).populate("user room");

    if (booking.user?._id?.toString() !== req.user._id) {
      throw new ErrorHandler("You cannot view this booking", 403);
    }

    return NextResponse.json({
      booking,
    });
  }
);
