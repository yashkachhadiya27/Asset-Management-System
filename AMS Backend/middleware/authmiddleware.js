import * as jwt from "jsonwebtoken";
import { JWT_KEY_1 } from "../config/env.js";

export function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, ACCESS_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


import JWTHelper from "../utils/jwtHelper.js";

export const checkAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      token = authorization.split(" ")[1];
      req.user = await JWTHelper.verifyUserAccessToken(token);
      next();
    } catch (error) {
      res.status(401).send({
        status: "failed ",
        message: "Unauthorized User",
        data: null,
        code: 401,
      });
    }
  }
  if (!token) {
    res.status(401).send({
      status: "failed",
      message: "Unauthorized User ,  No Token ",
      data: null,
      code: 401,
    });
  }
};
