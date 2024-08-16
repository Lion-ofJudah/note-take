import express from "express";
import {
  createNote,
  deleteNote,
  permanentDeleteNote,
  updateNote,
  archiveNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/create", createNote);
router.delete("/delete/:id", deleteNote);
router.delete("/permanent-delete/:id", permanentDeleteNote);
router.post("/update/:id", updateNote);
router.post("/archive/:id", archiveNote);

export default router;
