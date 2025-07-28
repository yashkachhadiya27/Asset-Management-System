import mongoose from 'mongoose';
import { issuedItemModel } from '../models/issuedItem.js';

class issuedItemController {
    static addIssuedItem = async (req, res) => {
        const session = await mongoose.startSession();
        const { serialNo, issueDate, description, issuePersonName, purpose, returnDate } = req.body;
        try {
            session.startTransaction();
            const issuedItem = await issuedItemModel.findOne({ serialNo: serialNo });
            if (issuedItem) {
                return res.error(400, "Serial number already exists..!!!", null);
            }
            if (serialNo && issueDate && description && issuePersonName && purpose) {
                const newIssuedItem = new issuedItemModel({
                    serialNo,
                    issueDate,
                    description,
                    issuePersonName,
                    purpose,
                    returnDate,
                });
                const savedIssuedItem = await newIssuedItem.save({ session });
                await session.commitTransaction();
                return res.success(201, "New issued item added successfully.", savedIssuedItem);
            } else {
                return res.error(400, "Please fill all the required details...!", null);
            }
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static getIssuedItems = async (req, res) => {
        try {
            const issuedItems = await issuedItemModel.find();
            return res.success(200, "All issued items found successfully.", issuedItems);
        } catch (error) {
            console.log("Error fetching issued items: " + error);
            return res.error(400, error, null);
        }
    }

    static getIssuedItem = async (req, res) => {
        const serialNo = req.params.serialNo;
        try {
            const issuedItem = await issuedItemModel.findOne({ serialNo: serialNo });
            if (!issuedItem) {
                return res.error(404, "Issued item not found for this serial number.", null);
            }
            return res.success(200, "Issued item found successfully.", issuedItem);
        } catch (error) {
            console.log("Error fetching issued item: " + error);
            return res.error(400, error, null);
        }
    }

    static updateIssuedItem = async (req, res) => {
        const session = await mongoose.startSession();
        const id = req.params.id;
        const { issueDate, description, issuePersonName, purpose, returnDate } = req.body;
        try {
            session.startTransaction();
            const issuedItem = await issuedItemModel.findOne({ _id: id });
            if (!issuedItem) {
                return res.error(404, "Issued item not found for this serial number.", null);
            }
            if (issueDate && description && issuePersonName && purpose) {
                const updatedIssuedItem = await issuedItemModel.updateOne(
                    { _id: id },
                    {
                        $set: {
                            issueDate,
                            description,
                            issuePersonName,
                            purpose,
                            returnDate,
                        },
                    },
                    { session }
                );
                await session.commitTransaction();
                return res.success(200, "Issued item updated successfully.", updatedIssuedItem);
            } else {
                return res.error(400, "Please fill all the required details...!", null);
            }
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    };

    static deleteIssuedItem = async (req, res) => {
        const session = await mongoose.startSession();
        const id = req.params.id;
        try {
            session.startTransaction();
            const issuedItem = await issuedItemModel.findOne({ _id: id });
            if (!issuedItem) {
                return res.error(404, "Issued item not found for this serial number.", null);
            }
            const deletion = await issuedItemModel.deleteOne({ _id: id }, { session });
            await session.commitTransaction();
            return res.success(200, "Issued item deleted successfully.", deletion);
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    }
}

export default issuedItemController;
