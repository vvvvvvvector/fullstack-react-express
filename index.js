import express from 'express'; // const express = require('express'); package.json -> "type": "module"
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json()); // allows to read json in req

// req -> what client send to me(for exp. from frontend) && res -> what i will send to client
app.get("/", (req, res) => {
    res.send("hello world!!!");
});

app.post("/auth/login", (req, res) => {
    console.log(req.body); // req.body -> json from post request

    // object {email: ..., password: ...} is encoded with token
    const token = jwt.sign({ 
        email: req.body.email,
        password: req.body.password
    }, 'secret-private-key');

    res.json({
        success: true,
        token
    });
});

app.listen(4500, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server started.");
    }
});