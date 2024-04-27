import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}`), await Room.deleteMany();
    await Room.insertMany(rooms);
    process.exit();
  } catch (error) {
    process.exit();
  }
};

seedRooms();
