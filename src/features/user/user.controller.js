
import { UserModel } from "./user.model.js";

import jwt from "jsonwebtoken"
import UserReposetory from "./user.repo.js";

import bcrypt from 'bcryptjs';


export default class UserController {
    // for UesrModel only
    // SingUp(req, res) {
    //     const { name, email, password, type } = req.body;
    //     const user = UserModel.SingUp(name, email, password, type);
    //     res.status(201).send(user);
    // }


    // singup for mongodb databases without userRepo , (can use try catch block)
    // async SingUp(req, res) {
    //     const { name, email, password, type } = req.body;
    //     const user = await UserModel.SingUp(name, email, password, type); 
    //     res.status(201).send(user);
    // }

    // singup for mongodb databases with userRepo
    // creating constructer for creating an instance  of UserRepo because this  is not a static in user.repo.js

    constructor() {
        this.userRepo = new UserReposetory();
    }

    async SingUp(req, res) {

        const { name, email, password, type } = req.body;

        // password -> hashed passwerod

        const hashedPassword = await bcrypt.hash(password, 12);  //since this is promise based function

        const user = new UserModel(name, email, hashedPassword, type);

        await this.userRepo.SingUp(user);

        res.status(201).send(user);

    }


    //for userModel without monogdb
    // SingIn(req, res) {
    //     const { email, password } = req.body;
    //     console.log(email, password);
    //     const user = UserModel.SingIn(email, password);
    //     if (!user) {
    //         res.status(400).send("Invalid Users");
    //     }
    //     else {
    //         //1 . creating tokken using jwt
    //         //token = jwt.sign( {payload} , "privateKey" , {time of expiry of token});
    //         const token = jwt.sign({ userID: user.id, email: user.email }, "asjkhgbjkhabkjfguhflkh", { expiresIn: '1h' })

    //         // res.send("user SingIn");

    //         //2 .sending token to server
    //         res.status(200).send(token);
    //     }
    // }

    // whitout bcrypt
    // async SingIn(req, res) {
    //     const { email, password } = req.body;
    //     console.log(email, password);
    //     // const user = UserModel.SingIn(email, password);
    //     // const user = await this.userRepo.SingIn(email, password);

    //     //when we are using bcrypt the first find by email and then compare the password
    //     const user = await this.userRepo.SingIn(email, password);
    //     console.log(user);
    //     if (!user) {
    //         res.status(400).send("Invalid Users");
    //     }
    //     else {
    //         //1 . creating tokken using jwt
    //         //token = jwt.sign( {payload} , "privateKey" , {time of expiry of token});
    //         const token = jwt.sign({ userID: user.id, email: user.email }, "asjkhgbjkhabkjfguhflkh", { expiresIn: '1h' })

    //         // res.send("user SingIn");
    //         //2 .sending token to server
    //         res.status(200).send(token);
    //     }
    // }


    // with bcrypt
    async SingIn(req, res) {
        const { email } = req.body;
        // console.log(email, password);

        //when we are using bcrypt the first find by email and then compare the password
        const user = await this.userRepo.SearchByEamil(email);

        // compare the password
        const result = await bcrypt.compare(req.body.password, user.password);  //returning Boolean;
        if (result) {
            //1 . creating tokken using jwt
            //token = jwt.sign( {payload} , "privateKey" , {time of expiry of token});
            const token = jwt.sign({ userID: user._id, email: user.email }, "asjkhgbjkhabkjfguhflkh", { expiresIn: '1h' })

            // for printing payload
            const decoded = jwt.decode(token);
            console.log(decoded);
            console.log("from user id", decoded.userID);

            // console.log("userId", req.userId);

            // res.send("user SingIn");
            //2 .sending token to server
            console.log("user is Logged in");
            res.status(200).send(token);
        }
        else {
            res.status(400).send("Invalid Users");
        }
    }


    // with userMOdel
    // all(req, res) {
    //     var users = UserModel.getAll();
    //     res.send(users);
    // }

    // with mongo db
    async all(req, res) {
        var users = await this.userRepo.getAll();
        res.status(200).send(users);
    }

}