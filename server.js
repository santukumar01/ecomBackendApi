import './env.js' //if this is not usses then because of hoiting all varible are going to be decalred first

// const express = require('express');
import express from 'express';
// importing swagger
import swagger, { serve } from 'swagger-ui-express';

import cors from 'cors';

import ProductRouter from './src/features/product/products.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
// import basicAuth from './src/middleware/basicAuth.middleware.js';
import jwtAuth from './src/features/user/middleware/jw.middleware.js';
import cartRouter from './src/features/cart/cartIteams.router.js';

import apiDocs from "./swagger.json" assert {type: 'json'};
import logMiddleware from './src/features/user/middleware/fs.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import { connectToMongoDb } from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.routes.js';

const PORT = 3000;

//create server
const app = express();

// cors policy configuration
// cors ->  Cross-origin resource sharing 

var corsOptions = {
    origin: "http://localhost:5500",
}

app.use(cors());

// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE
// Access-Control-Allow-Headers: Content-Type, Authorization



// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500'),
//         res.header('Access-Control-Allow-Methods', '*'),
//         res.header('Access-Control-Allow-Headers', '*')


//     // return ok for preflight error -> send by client for authorization before actual requsert

//     if (req.method == "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// })



//for sending data from server to client in JSON format(when you encountered error  like  req.body is undefied then it means server cant understand the data whioch was send form client)
app.use(bodyParser.json());

app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));


// for logging

app.use(logMiddleware)


//for all request releated to product  , redirect to product router

// app.use('/api/products', basicAuth, ProductRouter);  // for basic authentication
app.use('/api/products', jwtAuth, ProductRouter);   // for jwt authorizarion

app.use('/api/users', userRouter);

app.use('/api/cartItems', jwtAuth, cartRouter)

app.use('/api/orders', jwtAuth, orderRouter);

app.get('/', (req, res) => {
    res.send("Welcome to express server");
})



//for application level err handling

app.use((err, req, res, next) => {


    console.log(err);
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }

    res.status(500).send('Something went wrong');
})

// what is a an user request invalid url
// app.use((req, res) => {
//     res.status(404).send("Resourse dont found");
// })

app.listen(PORT, () => {
    console.log(`server is runnig on ${PORT}`);
    connectToMongoDb();
})