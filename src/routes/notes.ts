import * as NoteController from "../controller/notes";
import express from "express";

const router = express.Router();

router.get("/", NoteController.getNotes);
router.get("/:id", NoteController.getNotesId);
router.post("/", NoteController.createNotes);
router.put("/:id", NoteController.updateNotes);
router.delete("/:id", NoteController.deleteNotes);

export default router;
