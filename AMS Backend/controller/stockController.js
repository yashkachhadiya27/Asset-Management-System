import mongoose from 'mongoose';
import { stockModel } from '../models/stock.js';

class stockController {
    static addStock = async (req, res) => {
        const session = await mongoose.startSession();
        const { stockId, quantity, serialNo, description, purchaseOrderNo, billDate, billNo } = req.body;
        try {
            session.startTransaction();
            const stock = await stockModel.findOne({ stockId: stockId });
            if (stock) {
                return res.error(400, "Stock Id already exists..!!!", null);
            }
            if (stockId && quantity && serialNo && description && purchaseOrderNo && billDate && billNo) {
                const newStock = new stockModel({
                    stockId,
                    quantity,
                    serialNo,
                    description,
                    purchaseOrderNo,
                    billDate,
                    billNo,
                });
                const savedStock = await newStock.save({ session });
                await session.commitTransaction();
                return res.success(201, "New stock added successfully.", savedStock);
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

    static getStocks = async (req, res) => {
        try {
            const stocks = await stockModel.find();
            return res.success(200, "All stocks found successfully.", stocks);
        } catch (error) {
            console.log("Error fetching stocks: " + error);
            return res.error(400, error, null);
        }
    }

    static getStock = async (req, res) => {
        const stockId = req.params.stockId;
        try {
            const stock = await stockModel.findOne({ stockId: stockId });
            if (!stock) {
                return res.error(404, "Stock not found for this Id.", null);
            }
            return res.success(200, "Stock found successfully.", stock);
        } catch (error) {
            console.log("Error fetching stock: " + error);
            return res.error(400, error, null);
        }
    }

    static updateStock = async (req, res) => {
        const session = await mongoose.startSession();
        const stockId = req.params.stockId;
        const { quantity, serialNo, description, purchaseOrderNo, billDate, billNo } = req.body;
        try {
            session.startTransaction();
            const stock = await stockModel.findOne({ stockId: stockId });
            if (!stock) {
                return res.error(404, "Stock not found for this Id.", null);
            }
            if (quantity && serialNo && description && purchaseOrderNo && billDate && billNo) {
                const updatedStock = await stockModel.updateOne(
                    { stockId: stockId },
                    {
                        $set: {
                            quantity,
                            serialNo,
                            description,
                            purchaseOrderNo,
                            billDate,
                            billNo,
                        },
                    },
                    { session }
                );
                await session.commitTransaction();
                return res.success(200, "Stock updated successfully.", updatedStock);
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

    static deleteStock = async (req, res) => {
        const session = await mongoose.startSession();
        const stockId = req.params.stockId;
        try {
            session.startTransaction();
            const stock = await stockModel.findOne({ stockId: stockId });
            if (!stock) {
                return res.error(404, "Stock not found for this Id.", null);
            }
            const deletion = await stockModel.deleteOne({ stockId: stockId }, { session });
            await session.commitTransaction();
            return res.success(200, "Stock deleted successfully.", deletion);
        } catch (error) {
            await session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    }
}

export default stockController;
