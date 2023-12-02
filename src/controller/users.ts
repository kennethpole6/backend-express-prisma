import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcrypt";

const prisma = new PrismaClient()

interface UsersBody {
    name: string
    email: string
    password: string
}

export const getUsers:RequestHandler = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const getUsersId:RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!user) {
            throw createHttpError(404, "User not found...")
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const createUsers: RequestHandler<unknown, unknown, UsersBody, unknown> = async (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    try {
        if (!name || !email || !password) {
            throw createHttpError(400, "Parameters missing...")
        }
        const existedEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        }) 
        if (existedEmail) {
            throw createHttpError(400, "Email already exists...")
        }
        const hashPassword = hashSync(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })

        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

export const updateUsers: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    const { name, email, password } = req.body
    try {
        if (!id) {
            throw createHttpError(400, "Id is required")
        }

        const updatedUsers = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                email,
                password: hashSync(password, 8)
            }
        })

        res.status(200).json(updatedUsers)
    } catch (error) {
        next(error)
    }
}

export const deleteUsers: RequestHandler = async (req, res, next) => {
    const id = req.params.id

    try {
        if (!id) {
            throw createHttpError(400, "Id is required")
        }

        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}