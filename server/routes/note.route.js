import express from "express";
import {
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/create", createNote);
router.delete("/delete/:id", deleteNote);
router.post("/update/:id", updateNote);

export default router;
