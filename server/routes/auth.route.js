import express from "express";

import { userSignUp, userLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);

export default router;
