import express from "express";

import {
  userSignUp,
  userLogin,
  verifyToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/verify-token", verifyToken);

export default router;
