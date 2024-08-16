import express from "express";
import {
  getNotes,
  getBinNotes,
  getArchiveNotes,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-notes", getNotes);
router.get("/get-bin-notes", getBinNotes);
router.get("/get-archive-notes", getArchiveNotes);

export default router;
