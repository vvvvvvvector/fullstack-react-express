import express from 'express'; // const express = require('express'); package.json -> "type": "module"

const app = express();

// req -> what client send to me(for exp. from frontend) && res -> what i will send to client
app.get("/", (req, res) => {
    res.send("hello world"); 
});

app.listen(5432, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server started.");
    }
});