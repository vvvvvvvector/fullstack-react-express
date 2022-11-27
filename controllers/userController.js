import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { validationResult } from "express-validator";

import UserModel from "../models/user.js";

dotenv.config();

export const signIn = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password.",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password.",
      });
    }

    const super_secret_key = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      super_secret_key,
      {
        expiresIn: "5min",
      }
    );

    res.json({
      success: true,
      message: "Signed in successfully.",
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Sign in error.",
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      password: hash,
    });

    const user = await doc.save();

    const super_secret_key = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      super_secret_key,
      {
        expiresIn: "5min",
      }
    );

    res.json({
      success: true,
      message: "User was created successfully.",
      user,
      token,
    });
  } catch (error) {
    console.log(error); // for dev

    res.status(500).json({
      // for user
      success: false,
      message: "Error while creating user.",
    });
  }
};
