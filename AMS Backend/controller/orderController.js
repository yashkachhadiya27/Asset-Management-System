import mongoose from "mongoose";
import { orderModel } from "../models/order.js";

class orderController {
    static addOrder = async (req, res) => {
        const session = await mongoose.startSession();
        const { orderNo, specification, purchaseDate, orderDate, unitPrice, quantity, totalPrice, cgst, sgst } = req.body;
        try {
            session.startTransaction();
            const order = await orderModel.findOne({ orderNo: orderNo });
            if (order) {
                return res.error(400, "Order number already exist..!!!", null);
            }
            if (orderNo && specification && purchaseDate && orderDate && unitPrice && quantity && totalPrice && cgst && sgst) {
                const newOrder = new orderModel({
                    orderNo: orderNo,
                    specification: specification,
                    purchaseDate: purchaseDate,
                    orderDate: orderDate,
                    unitPrice: unitPrice,
                    quantity: quantity,
                    totalPrice: totalPrice,
                    cgst: cgst,
                    sgst: sgst
                });
                const order = await newOrder.save(session);
                await session.commitTransaction();
                return res.success(201, "New order added successfully.", order);
            } else {
                return res.error(400, "Fill all the details please...!", null);
            }
        } catch (error) {
            session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession()
        }
    };

    static getOrders = async (req, res) => {
        try {
            const order = await orderModel.find();
            return res.success(201, "All orders found successfully.", order);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }

    static getOrder = async (req, res) => {
        const orderNo = req.params.orderNo;
        try {
            const order = await orderModel.findOne({ orderNo: orderNo });
            return res.success(201, "All orders found successfully.", order);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }

    static updateOrder = async (req, res) => {
        const session = await mongoose.startSession();
        const orderNo = req.params.orderNo;
        const { specification, purchaseDate, orderDate, unitPrice, quantity, totalPrice, cgst, sgst } = req.body;
        try {
            session.startTransaction();
            const order = await orderModel.findOne({ orderNo: orderNo });
            if (!order) {
                return res.error(400, "Order not found for this number.", null);
            }
            if (orderNo && specification && purchaseDate && orderDate && unitPrice && quantity && totalPrice && cgst && sgst) {
                const update = await orderModel.updateOne({ orderNo: orderNo }, {
                    $set: {
                        specification: specification,
                        purchaseDate: purchaseDate,
                        orderDate: orderDate,
                        unitPrice: unitPrice,
                        quantity: quantity,
                        totalPrice: totalPrice,
                        cgst: cgst,
                        sgst: sgst
                    }
                }, { sessionId: session });
                await session.commitTransaction();
                return res.success(201, "Order updated successfully.", order);
            } else {
                return res.error(400, "Fill all the details please...!", null);
            }
        } catch (error) {
            session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession()
        }
    };

    static deleteOrder = async (req, res) => {
        const session = await mongoose.startSession();
        const orderNo = req.params.orderNo;
        try {
            session.startTransaction();
            const order = await orderModel.findOne({ orderNo: orderNo });
            if (!order) {
                return res.error(400, "Order not found for this number.", null);
            }
            const delation = await orderModel.deleteOne({ orderNo: orderNo }, { session: session });
            await session.commitTransaction();
            return res.success(201, "Order deleted successfully.", delation);
        } catch (error) {
            session.abortTransaction();
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        } finally {
            session.endSession();
        }
    }
}


export default orderController;