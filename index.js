import express from 'express'; // const express = require('express'); package.json -> 'type': 'module'
import mongoose from 'mongoose';

import { signUpValidation } from './validations/auth.js';

import * as UserController from './controllers/userController.js';

const app = express();

app.use(express.json()); // allows to read json in req

mongoose.connect(
    'mongodb+srv://vvvvvec1or:adminvector@my-cluster.nvcxdyv.mongodb.net/express-test?retryWrites=true&w=majority'
).then(() => {
    console.log('Successfully connected to database');
}).catch((error) => {
    console.log('Error while connecting to database', error);
});

// req -> what client send to me(for exp. from frontend) && res -> what i will send to client
app.get('/', (_, res) => {
    res.send('hello world!!!');
});

app.post('/auth/signin', UserController.signIn);

// signUpValidation -> req validation
app.post('/auth/signup', signUpValidation, UserController.signUp);

app.listen(4500, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server started.');
    }
});