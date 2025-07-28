import express from "express";
import { checkAuth } from "../middleware/authmiddleware.js";
import { userRouter } from "./userRoutes.js";
import { orderRouter } from "./orderRoutes.js";
import userController from "../controller/userController.js";
import { issuedItemRouter } from "./issuedItemRoutes.js";
// import { productRouter } from "./productRoutes.js";
import { stockRouter } from "./stockRoutes.js";
import productRouter  from "./productRoutes.js";
import { labRouter } from "./labRoutes.js";
import { dashboardRouter } from "./dashboardRoutes.js";
export const router = express.Router();

router.post('/api/user/userLogin', userController.userLogin);
router.use(checkAuth)
router.use("/api/user", userRouter);
router.use("/api/order", orderRouter);
router.use("/api/issuedItem", issuedItemRouter);
router.use("/api/product", productRouter);
router.use("/api/stock", stockRouter);
router.use("/api/labs", labRouter);
router.use("/api/dashboard", dashboardRouter);


