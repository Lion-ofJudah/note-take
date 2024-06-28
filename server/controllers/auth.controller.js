import User from "../models/user.model.js";
import { signUpValidator } from "../middlewares/auth.middleware.js";
import { errorLog } from "../utils/logger.js";

export const userSignUp = [
  signUpValidator,

  async (req, res) => {
    try {
      const { userName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use.",
        });
      }

      const newUser = await User.create({
        userName,
        email,
        password,
      });

      const { password: pass, ...others } = newUser._doc;

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: others,
      });
    } catch (error) {
      errorLog(error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
];

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const isPasswordSimilar = user.comparePassword(password);
    if (!isPasswordSimilar) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const token = await user.generateToken();
    const { password: pass, ...others } = user._doc;
    res
      .status(200)
      .cookie("accessToken", token, { httpOnly: true })
      .json({
        success: true,
        message: "User logged in successfully.",
        data: { ...others, token },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
