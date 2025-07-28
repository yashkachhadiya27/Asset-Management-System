import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";
import { JWT_KEY_1, JWT_KEY_2 } from "../config/env.js";

class JWTHelper {
  static createAccessToken = (Id) => {
    return jwt.sign({ userId: Id }, JWT_KEY_1, {
      expiresIn: "1d",
    });
  };

  static verifyUserAccessToken = async (token) => {
    const { userId } = jwt.verify(token, JWT_KEY_1);
    const user = await userModel.findById(userId).select("-password");
    return user;
  };

  static createRefreshToken = (Id) => {
    return jwt.sign({ userId: Id }, JWT_KEY_2, {
      expiresIn: "1y",
    });
  };

  static verifyUserRefreshToken = async (token) => {
    const { userId } = jwt.verify(token, JWT_KEY_2);
    const user = await userModel.findById(userId).select("-password");
    return user;
  };

  static createUserPasswordChangeToken = (Id) => {
    return jwt.sign({ userId: Id }, JWT_KEY_3, {
      expiresIn: "15m",
    });
  }

  static verifyUserPasswordChangeToken = async (token) => {
    const { userId } = jwt.verify(token, JWT_KEY_3);
    const user = await userModel.findById(userId).select("-password");
    return user;
  };
}

export default JWTHelper;
