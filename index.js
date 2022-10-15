import express from 'express'; // const express = require('express'); package.json -> 'type': 'module'
import mongoose from 'mongoose';

import { signUpValidation, postCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/userController.js';
import * as PostController from './controllers/postController.js';

import UserModel from './models/user.js';

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

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);

app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.removeOne);
app.patch('/posts/:id', checkAuth, PostController.update);

app.post('/auth/signin', UserController.signIn);

// signUpValidation -> req validation
app.post('/auth/signup', signUpValidation, UserController.signUp);

// can user get info about himself with this token?; have user access to this request? is there a token?
app.get('/auth/me', checkAuth, async (req, res) => {
    try {
        // here is the code we are protecting
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "user not found."
            });
        }

        res.json({
            success: true,
            message: "authorization was successful.",
            user
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "error while getting user."
        });
    }
});

app.listen(4500, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server started.');
    }
});