import express from "express";
import orderController from "../controller/orderController.js";

export const orderRouter = express.Router();

orderRouter.post('/addOrder', orderController.addOrder);
orderRouter.get('/getOrders', orderController.getOrders);
orderRouter.put('/updateOrder/:orderNo', orderController.updateOrder);
orderRouter.get('/getOrder/:orderNo', orderController.getOrder);
orderRouter.delete('/deleteOrder/:orderNo', orderController.deleteOrder);
