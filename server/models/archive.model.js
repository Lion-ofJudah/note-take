import mongoose from "mongoose";

const archiveSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Archive = mongoose.model("Archive", archiveSchema);
export default Archive;
