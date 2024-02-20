
import express from "express";

import UserController from "./user.controller.js";
import UserReposetory from "./user.repo.js";

const userRouter = express.Router();

const userController = new UserController();


// below is for userModel   ,we are only passing the refrenace 
// userRouter.post('/singup', userController.SingUp)  // in this userController we are passing the refreance of Singup funbction

// below is for userrepo and this keyword , wev are calling the function
userRouter.post('/signup', (req, res) => {
    userController.SingUp(req, res);
})

// userRouter.post('/signin', userController.SingIn)
userRouter.post('/signin', (req, res) => {
    userController.SingIn(req, res);
})



// userRouter.get('/userall', userController.all)

userRouter.get('/userall', (req, res) => {
    userController.all(req, res);
})

export default userRouter;