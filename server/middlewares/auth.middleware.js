import { check, validationResult } from "express-validator";

export const signUpValidator = [
  check("userName")
    .trim()
    .notEmpty()
    .withMessage("User name is required.")
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters long."),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = errors.errors[0];
      return res.status(400).json({
        status: false,
        message: error.msg,
      });
    }

    next();
  },
];

export const loginValidation = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email ir required.")
    .isEmail()
    .withMessage("Invalid email format."),
  check("password").trim().notEmpty().withMessage("Password is required."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = errors.errors[0];
      return res.status(400).json({
        status: false,
        message: error.msg,
      });
    }

    next();
  },
];
