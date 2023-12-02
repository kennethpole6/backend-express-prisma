import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { generateToken } from "../utils/generateToken";

const prisma = new PrismaClient();

export const login: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    //if no email or password provided
    if (!email || !password) {
      throw createHttpError(400, "Parameters missing...");
    }
    //check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    //if user does not exist
    if (!user) {
      throw createHttpError(400, "This user does not exists...");
    }
    //compare password to the db
    const hashPassword = await compare(password, user.password);
    //if password does not match
    if (!hashPassword) {
      throw createHttpError(400, "Invalid credentials...");
    }

    //generate token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = generateToken(payload);
    res.status(200).json({
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};
