import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import env from "../utils/validateEnv";
import createHttpError from "http-errors";

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req?.cookies?.token;

  if (!token) {
    throw createHttpError(401, "User not authenticated");
  }
  jwt.verify(token, env.TOKEN_SECRET, (err: VerifyErrors | null) => {
    if (err) {
      throw createHttpError(401, "User not authenticated");
    }
    next();
  });
};
