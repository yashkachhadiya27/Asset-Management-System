import mongoose from "mongoose";
const colSchema = new mongoose.Schema(
    {
        orderNo: { type: Number, required: true, unique: true },
        specification: { type: String, required: true },
        purchaseDate: { type: Date, required: true },
        orderDate: { type: Date, required: true },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        cgst: { type: Number, required: true },
        sgst: { type: Number, required: true }
    },
    { timestamps: true }
);

export const orderModel = mongoose.model("Order", colSchema);
