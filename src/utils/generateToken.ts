import jwt from "jsonwebtoken";
import env from "./validateEnv";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
