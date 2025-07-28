import express from 'express';
import userController from '../controller/userController.js';
export const userRouter = express.Router();


userRouter.post('/userRegistration', userController.userRegistration);
userRouter.get('/getUsers', userController.getUsers);
userRouter.get('/getUser/:userId', userController.getUser);
userRouter.put('/updateUser/:userId', userController.updateUser);
userRouter.delete('/deleteUser/:userId', userController.deleteUser);


