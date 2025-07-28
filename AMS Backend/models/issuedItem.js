import mongoose from 'mongoose';

const issuedItemSchema = new mongoose.Schema(
    {
        serialNo: { type: String, required: true },
        issueDate: { type: Date, required: true },
        description: { type: String, required: true },
        issuePersonName: { type: String, required: true },
        purpose: { type: String, required: true },
        returnDate: { type: Date }
    },
    { timestamps: true }
);

export const issuedItemModel = mongoose.model('IssuedItem', issuedItemSchema);