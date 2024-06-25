import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(this.password, saltRound);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
