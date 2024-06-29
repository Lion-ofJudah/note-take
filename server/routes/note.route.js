import express from "express";
import { createNote } from "../controllers/note.controller.js";

const router = express.Router();

router.post("/create", createNote);

export default router;
