import express from "express";

import { successLog } from "./utils/logger.js";
import "./db/index.js";

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  successLog(`Listening on port ${PORT}...`);
});
