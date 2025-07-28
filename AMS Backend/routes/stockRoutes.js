import express from "express";
import stockController from "../controller/stockController.js";

export const stockRouter = express.Router();

stockRouter.post('/addStock', stockController.addStock);
stockRouter.get('/getStocks', stockController.getStocks);
stockRouter.put('/updateStock/:stockId', stockController.updateStock);
stockRouter.get('/getStock/:stockId', stockController.getStock);
stockRouter.delete('/deleteStock/:stockId', stockController.deleteStock);
