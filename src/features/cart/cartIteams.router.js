import express from "express"

import CartItemController from "./cartIteams.controller.js";

const cartRouter = express.Router();

const cartIteamController = new CartItemController()

// cartRouter.get('/', cartIteamController.getCartItems);

cartRouter.get('/', (req, res) => {
    cartIteamController.getCartItems(req, res);
});

cartRouter.post('/new-item', (req, res) => {
    cartIteamController.add(req, res)
})


// cartRouter.delete('/:id', cartIteamController.delete);
cartRouter.delete('/', (req, res) => {
    cartIteamController.delete(req, res);
});

export default cartRouter;
