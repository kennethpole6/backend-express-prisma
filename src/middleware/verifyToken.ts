import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import env from "../utils/validateEnv";

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req?.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  jwt.verify(token, env.TOKEN_SECRET, (err: VerifyErrors | null) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  });
};
