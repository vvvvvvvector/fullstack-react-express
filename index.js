import express from "express"; // const express = require('express'); package.json -> 'type': 'module'
import mongoose from "mongoose";
import multer from "multer";
import dotenv from "dotenv";

import { signUpValidation, postCreateValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";

import { UserController, PostController } from "./controllers/index.js";

import UserModel from "./models/user.js";

// rename a remote branch

const app = express();
dotenv.config();

app.use(express.json()); // allows to read json in req
app.use("/uploads", express.static("uploads")); // not just get request -> it's get request to get a static file

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const storage = multer.diskStorage({
  destination: (_, file, callback) => {
    // returns path to the file
    callback(null, "uploads");
  },
  filename: (_, file, callback) => {
    // before saving explains how file is named
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    success: true,
    message: "image was successfully uploaded.",
    url: `/uploads/${req.file.originalname}`,
  });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("Error while connecting to database", error);
  });

// req -> what client send to me(for exp. from frontend || query) && res -> what i will send to client
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "hello world!",
    request: req.query,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);

app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.removeOne);
app.patch("/posts/:id", checkAuth, PostController.update);

app.post("/auth/signin", UserController.signIn);

// signUpValidation -> req validation
app.post("/auth/signup", signUpValidation, UserController.signUp);

// can user get info about himself with this token?; have user access to this request? is there a token?
app.get("/auth/me", checkAuth, async (req, res) => {
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
});

const port = process.env.PORT || 4500;

app.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Server started.");
});
