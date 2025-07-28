import dashboardController from "../controller/dashboardController.js";
import express from "express";

export const dashboardRouter = express.Router();
dashboardRouter.get('/getAIOCount', dashboardController.getAIOCount);
dashboardRouter.get('/getCPUCount', dashboardController.getCPUCount);
dashboardRouter.get('/getKeyboardCount', dashboardController.getKeyboardCount);
dashboardRouter.get('/getMonitorCount', dashboardController.getMonitorCount);
dashboardRouter.get('/getMouseCount', dashboardController.getMouseCount);


