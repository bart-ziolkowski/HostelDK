import { NextRequest, NextResponse } from "next/server";
import Room, { IImage, IRoom } from "../models/room";
import { delete_file, upload_file } from "../utils/cloudinary";
import room, { IReview } from "../models/room";

import APIFilters from "../utils/apiFilters";
import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 4;

  const { searchParams } = new URL(req.url);

  const queryStr: any = {};
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  const apiFilters = new APIFilters(Room, queryStr).search().filter();

  let rooms: IRoom[] = await apiFilters.query;
  const filteredRoomsCount: number = rooms.length;

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  body.user = req.user._id;

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id).populate("reviews.user");

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

export const uploadRoomImages = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    const uploader = async (image: string) =>
      upload_file(image, "bookit/rooms");

    const urls = await Promise.all((body?.images).map(uploader));

    room = await Room.findByIdAndUpdate(
      params.id,
      { images: [...urls] },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

export const deleteRoomImage = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    const isDeleted = await delete_file(body?.imgId);

    if (isDeleted) {
      room.images = room?.images.filter(
        (img: IImage) => img.public_id !== body.imgId
      );
    }

    await room.save();

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    for (let i = 0; i < room?.images?.length; i++) {
      await delete_file(room?.images[i].public_id);
    }

    await room.deleteOne();

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

export const createRoomReview = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { rating, comment, roomId } = body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  let room = await Room.findById(roomId);

  const isReviewed = room?.reviews?.find(
    (r: IReview) => r.user?.toString() === req?.user?._id?.toString()
  );

  if (isReviewed) {
    room?.reviews?.forEach((review: IReview) => {
      if (review.user?.toString() === req?.user?._id?.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
  }

  const reviews = room.reviews;
  const numOfReviews = room.reviews.length;

  const ratings =
    room?.reviews?.reduce(
      (acc: number, item: { rating: number }) => item.rating + acc,
      0
    ) / room?.reviews?.length;

  await Room.findByIdAndUpdate(
    roomId,
    { ratings: ratings, numOfReviews: numOfReviews, reviews: reviews },
    { new: true }
  );

  return NextResponse.json({
    success: true,
  });
});

export const canReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  const canReview = bookings?.length > 0 ? true : false;

  return NextResponse.json({
    canReview,
  });
});

export const getAllRoomsAdmin = catchAsyncErrors(async (req: NextRequest) => {
  const rooms = await Room.find();

  return NextResponse.json({
    rooms,
  });
});

export const getRoomReviews = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const room = await Room.findById(searchParams.get("roomId"));

  return NextResponse.json({
    reviews: room.reviews,
  });
});

export const deleteRoomReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const roomId = searchParams.get("roomId");
  const reviewId = searchParams.get("id");

  const room = await Room.findById(roomId);

  const reviews = room.reviews.filter(
    (review: IReview) => review?._id.toString() !== reviewId
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : room?.reviews?.reduce(
          (acc: number, item: { rating: number }) => item.rating + acc,
          0
        ) / numOfReviews;

  await Room.findByIdAndUpdate(roomId, { reviews, numOfReviews, ratings });

  return NextResponse.json({
    success: true,
  });
});
