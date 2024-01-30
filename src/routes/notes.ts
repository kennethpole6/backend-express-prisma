import { validateRequestBody } from "zod-express-middleware";
import * as NoteController from "../controller/notes";
import express from "express";
import { notesSchema } from "../utils/schema/notesSchema";

const router = express.Router();

router.get("/", NoteController.getNotes);
router.get("/:id", NoteController.getNotesId);
router.post("/", validateRequestBody(notesSchema), NoteController.createNotes);
router.put(
  "/:id",
  validateRequestBody(notesSchema),
  NoteController.updateNotes
);
router.delete("/:id", NoteController.deleteNotes);

export default router;
