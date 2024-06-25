import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorLog, successLog } from "../utils/logger.js";

dotenv.config();

main().catch((err) => errorLog(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  successLog("Connected to MONGO successfully...");
}
