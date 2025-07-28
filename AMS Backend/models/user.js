import mongoose from "mongoose";
const colSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Lab Assistant", "Coordinator"],
      required: true,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", colSchema);
