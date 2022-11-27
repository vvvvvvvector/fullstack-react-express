import { body } from "express-validator";

export const signUpValidation = [
  body("email", "invalid email!").isEmail(),
  body("password", "invalid password length!").isLength({ min: 5, max: 25 }),
];

export const postCreateValidation = [
  body("title", "too short post title").isLength({ min: 3 }).isString(),
  body("text", "too short post text").isLength({ min: 3 }).isString(),
  body("tags", "invalid tags format").optional().isArray(),
  body("imageUrl", "invalid image url").optional().isString(),
];
