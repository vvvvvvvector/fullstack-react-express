import { body } from "express-validator";

export const signUpValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 25 })
];