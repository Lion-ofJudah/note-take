import express from "express";
import { successLog } from "./utils/logger.js";

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  successLog(`Listening on port ${PORT}...`);
});
