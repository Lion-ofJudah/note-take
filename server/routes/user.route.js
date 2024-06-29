import express from "express";
import { getNotes } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getnotes", getNotes);

export default router;
