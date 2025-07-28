import express from "express";
import issuedItemController from "../controller/issuedItemController.js";

export const issuedItemRouter = express.Router();

issuedItemRouter.post('/addIssuedItem', issuedItemController.addIssuedItem);
issuedItemRouter.get('/getIssuedItems', issuedItemController.getIssuedItems);
issuedItemRouter.put('/updateIssuedItem/:id', issuedItemController.updateIssuedItem);
issuedItemRouter.get('/getIssuedItem/:serialNo', issuedItemController.getIssuedItem);
issuedItemRouter.delete('/deleteIssuedItem/:id', issuedItemController.deleteIssuedItem);
