import mongoose from "mongoose";

const binSchema = mongoose.Schema(
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
    // Note expiration time of 30 days
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 720 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

// TTL index creation for expiresAt field
binSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Bin = mongoose.model("Bin", binSchema);
export default Bin;
