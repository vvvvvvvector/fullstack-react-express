import express from 'express'; // const express = require('express'); package.json -> "type": "module"
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { validationResult } from 'express-validator';
import { signUpValidation } from './validations/auth.js';

import UserModel from './models/User.js';

mongoose.connect(
    'mongodb+srv://vvvvvec1or:adminvector@my-cluster.nvcxdyv.mongodb.net/express-test?retryWrites=true&w=majority'
).then(() => {
    console.log('Successfully connected to database');
}).catch((error) => {
    console.log('Error while connecting to database', error);
});

const app = express();

app.use(express.json()); // allows to read json in req

// req -> what client send to me(for exp. from frontend) && res -> what i will send to client
app.get("/", (req, res) => {
    res.send("hello world!!!");
});

app.post("/auth/signin", async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password."
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.password);

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password."
            });
        }

        const token = jwt.sign({
            _id: user._id
        },
            'super-secret-key',
            {
                expiresIn: "1d"
            }
        );

        res.json({
            success: true,
            message: "Signed in successfully.",
            user,
            token
        });
    } catch (error) {
        console.log(error)

        res.json({
            success: false,
            message: "Sign in error."
        });
    }
});

// signUpValidation -> req validation
app.post("/auth/signup", signUpValidation, async (req, res) => {
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
            password: hash
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        },
            'super-secret-key',
            {
                expiresIn: "1d"
            }
        );

        res.json({
            success: true,
            message: "User was created successfully.",
            user,
            token
        });
    } catch (error) {
        console.log(error); // for dev

        res.status(500).json({ // for user
            success: false,
            message: "Error while creating user."
        })
    }
});

app.listen(4500, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server started.");
    }
});