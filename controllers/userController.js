import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { validationResult } from "express-validator";

import UserModel from "../models/user.js";

dotenv.config();

export const authMe = async (req, res) => {
  try {
    // here is the code we are protecting
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found.",
      });
    }

    const { password, ...rest } = user._doc;

    res.json({
      success: true,
      message: "authorization was successful.",
      user: rest,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "error while getting user.",
    });
  }
};

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

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1min",
      }
    );

    const { password, ...rest } = user._doc;

    res.json({
      success: true,
      message: "Signed in successfully.",
      user: rest,
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

    const inputPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(inputPassword, salt);

    const doc = new UserModel({
      email: req.body.email,
      password: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30min",
      }
    );

    const { password, ...rest } = user._doc;

    res.json({
      success: true,
      message: "User was created successfully.",
      user: rest,
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
