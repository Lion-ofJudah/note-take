import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_KEY);
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
