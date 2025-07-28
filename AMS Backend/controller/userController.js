import { userModel } from '../models/User.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import JWTHelper from '../utils/jwtHelper.js';

export default class userController {
  static userRegistration = async (req, res) => {
    const { email, password, role } = req.body;
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const user = await userModel.findOne({
        email: email,
      });
      if (user) {
        return res.error(400, "Email already exists!", null);
      } else {
        if (email && password && role) {
          7
          const salt = await bcrypt.genSalt(10);
          const hashPass = await bcrypt.hash(password, salt);
          const newUser = new userModel({
            email: email,
            password: hashPass,
            role: role
          });
          const data = await newUser.save(session);
          session.commitTransaction();
          return res.success(201, "User registered successfully.", data);
        } else {
          return res.error(400, "All fields are required!", null);
        }
      }
    } catch (error) {
      session.abortTransaction();
      console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };

  static userLogin = async (req, res) => {
    const { email, password, role } = req.body;
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      if (email && password) {
        const user = await userModel.findOne({
          email: email,
        });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            const accessToken = JWTHelper.createAccessToken(user._id);
            const refreshToken = JWTHelper.createRefreshToken(user._id);
            const data = {
              email:user.email,
              role: user.role,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
            await session.commitTransaction();
            return res.success(201, "User logged in successfully.", data);
          } else {
            return res.error(400, "Email or Password incorrect!", null);
          }
        } else {
          return res.error(400, "User not registered!", null);
        }
      } else {
        return res.error(400, "All fields are required!", null);
      }
    } catch (error) {
      session.abortTransaction();
      console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };
  static getUsers = async (req, res) => {
    try {
      const users = await userModel.find();
      return res.success(200, "All users found successfully.", users);
    } catch (error) {
      console.log("Error fetching users: " + error);
      return res.error(400, error, null);
    }
  };
  static getUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await userModel.findOne({ _id: userId });
      if (!user) {
        return res.error(404, "User not found for this Id.", null);
      }
      return res.success(200, "User found successfully.", user);
    } catch (error) {
      console.log("Error fetching user: " + error);
      return res.error(400, error, null);
    }
  };
  static updateUser = async (req, res) => {
    const session = await mongoose.startSession();
    const userId = req.params.userId;
    const { email, password, role } = req.body;
    try {
      session.startTransaction();
      const user = await userModel.findOne({ _id: userId });
      if (!user) {
        return res.error(404, "User not found for this Id.", null);
      }
      if (email && password && role) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        password = hashPass;
        const updatedUser = await userModel.updateOne(
          { _id: userId },
          {
            $set: {
              email,
              password,
              role
            },
          },
          { session }
        );
        await session.commitTransaction();
        return res.success(200, "User updated successfully.", updatedUser);
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

  static deleteUser = async (req, res) => {
    const session = await mongoose.startSession();
    const userId = req.params.userId;
    try {
      session.startTransaction();
      const user = await userModel.findOne({ _id: userId });
      if (!user) {
        return res.error(404, "user not found for this Id.", null);
      }
      const deletion = await userModel.deleteOne({ _id: userId }, { session });
      await session.commitTransaction();
      return res.success(200, "User deleted successfully.", deletion);
    } catch (error) {
      await session.abortTransaction();
      console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  }
};