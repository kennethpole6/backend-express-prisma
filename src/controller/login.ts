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

    const token = await generateToken(payload);

    //implementing httponly cookie
    await res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
      secure: true,
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
