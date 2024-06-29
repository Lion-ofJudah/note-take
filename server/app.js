import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";
import userRoutes from "./routes/user.route.js";
import { successLog } from "./utils/logger.js";
import "./db/index.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  successLog(`Listening on port ${PORT}...`);
});
