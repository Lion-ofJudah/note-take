import jwt from "jsonwebtoken";

export const verifiedUser = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user.",
      });
    }

    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user.",
        });
      }

      req.user = user;

      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
