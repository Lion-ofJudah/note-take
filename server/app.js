import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import { successLog } from "./utils/logger.js";
import "./db/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  successLog(`Listening on port ${PORT}...`);
});
