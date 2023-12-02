import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
const prisma = new PrismaClient();

interface NotesBody {
    userId: number;
    title: string;
    description?: string;
}

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await prisma.notes.findMany({
            include: {
                User: true
            }
        })
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const getNotesId: RequestHandler = async (req, res, next) => {
    const id = req.params.id

    try {
        const notes = await prisma.notes.findUnique({
            where: {
                id: Number(id)
            }
        })
        //if no notes is found
        if (!notes) {
            throw createHttpError(404, "Notes not found")
        }
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const createNotes: RequestHandler<unknown, unknown, NotesBody, unknown> = async (req, res, next) => {
    const userId = req.body.userId
    const title = req.body.title
    const description = req.body.description

    try {
        if (!title) {
            throw createHttpError(400, "Title is required")
        }

        const notes = await prisma.notes.create({
            data: {
                userId,
                title,
                description
            }
        })
        res.status(201).json(notes)
    } catch (error) {
        next(error)
    }
}

export const updateNotes: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        if (!id) {
            throw createHttpError(400, "Id is required")
        }

        const updatedNotes = await prisma.notes.update({
            where: {
                id: Number(id)
            },
            data: {
                ...req.body
            }
        })
        res.status(200).json(updatedNotes)
    } catch (error) {
        next(error)
    }
}

export const deleteNotes: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        if (!id) {
            throw createHttpError(400, "Id is required")
        }

        await prisma.notes.delete({
            where: {
                id: Number(id)
            }
        })
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
} 