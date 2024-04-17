import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hosteldk");
    await Room.deleteMany();
    await Room.insertMany(rooms);
    process.exit();
  } catch (error) {
    process.exit();
  }
};

seedRooms();
