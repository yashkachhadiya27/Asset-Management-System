import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
    {
        stockId: { type: Number, required: true, unique: true },
        quantity: { type: Number, required: true },
        serialNo: { type: String, required: true },
        description: { type: String, required: true },
        purchaseOrderNo: { type: Number, required: true },
        billDate: { type: Date, required: true },
        billNo: { type: Number, required: true }
    },
    { timestamps: true }
);

export const stockModel = mongoose.model('Stock', stockSchema);