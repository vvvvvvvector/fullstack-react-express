import { body } from "express-validator";

export const signUpValidation = [
    body('email', "invalid email!").isEmail(),
    body('password', "invalid password length!").isLength({ min: 5, max: 25 })
];