import User from "../models/user.model.js";
import { errorLog } from "../utils/logger.js";

export const userSignUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: "Email already at use." });
    }

    const newUser = await User.create({
      userName,
      email,
      password,
    });

    const { password: pass, ...others } = newUser._doc;

    newUser.save();
    res
      .status(200)
      .json({
        success: true,
        message: "User created successfully.",
        data: others,
      });
  } catch (error) {
    errorLog(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
