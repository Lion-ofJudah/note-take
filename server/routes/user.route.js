import express from "express";
import { getNotes, getBinNotes } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-notes", getNotes);
router.get("/get-bin-notes", getBinNotes);

export default router;
