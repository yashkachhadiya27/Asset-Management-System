import mongoose from "mongoose";
import { DATABASE_URL } from "../config/env.js";
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
export default connectDB;
