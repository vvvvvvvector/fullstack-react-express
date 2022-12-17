import express from "express"; // const express = require('express'); package.json -> 'type': 'module'
import mongoose from "mongoose";
import dotenv from "dotenv";

import checkAuth from "./utils/checkAuth.js";
import { signUpValidation, postCreateValidation } from "./validations.js";

import { UserController, PostController } from "./controllers/index.js";

// autodeploy?

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("Error while connecting to database", error);
  });

dotenv.config();

const app = express();

app.use(express.json()); // allows to read json in req

app.use((_, res, next) => {
  res.header("Access-Control-Allow-origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);

app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.patch("/posts/:id", checkAuth, PostController.update);
app.delete("/posts/:id", checkAuth, PostController.removeOne);

app.post("/auth/signin", UserController.signIn);

// signUpValidation -> req validation
app.post("/auth/signup", signUpValidation, UserController.signUp);

// can user get info about himself with this token?; have user access to this request? is there a token?
app.get("/auth/me", checkAuth, UserController.authMe);

// req -> what client send to me(for exp. from frontend || query) && res -> what i will send to client
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "hello world!",
    request: req.query,
  });
});

const port = process.env.PORT || 4500;

app.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Server started.");
});

// import multer from "multer";

// app.use("/uploads", express.static("uploads")); // not just get request -> it's get request to get a static file

// const storage = multer.diskStorage({
//   destination: (_, file, callback) => {
//     // returns path to the file
//     callback(null, "uploads");
//   },
//   filename: (_, file, callback) => {
//     // before saving explains how file is named
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
//   res.json({
//     success: true,
//     message: "image was successfully uploaded.",
//     url: `/uploads/${req.file.originalname}`,
//   });
// });
