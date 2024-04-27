import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vercel-admin-user:pNJT8inUdHj3uoeM@hosteldk.pftwzmb.mongodb.net/hosteldk?retryWrites=true&w=majority"
    ),
      await Room.deleteMany();
    await Room.insertMany(rooms);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
