import express from 'express'; // const express = require('express'); package.json -> "type": "module"
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { signUpValidation } from './validations/auth.js';

mongoose.connect(
    'mongodb+srv://vvvvvec1or:adminvector@my-cluster.nvcxdyv.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
    console.log('Successfully connected to database');
}).catch((error) => {
    console.log('Srror while connecting to database', error);
});

const app = express();

app.use(express.json()); // allows to read json in req

// req -> what client send to me(for exp. from frontend) && res -> what i will send to client
app.get("/", (req, res) => {
    res.send("hello world!!!");
});

app.post("/auth/signup", signUpValidation, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    res.json({
        success: true
    });
});

app.listen(4500, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server started.");
    }
});