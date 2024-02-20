

import CartRepository from "./cart.repo.js";
import CartItemModel from "./cartIteams.model.js";

export default class CartItemController {
    constructor() {
        this.cartRepo = new CartRepository();
    }
    // static add(req, res) {
    //     const { productId, quantity } = req.query;
    //     const userId = req.userId;
    //     console.log("userId" + userId)
    //     CartItemModel.add(productId, userId, quantity);
    //     res.status(200).send('cart item is added');
    // }
    async add(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.userId;
            console.log(userId, productId, quantity)
            const rec = await this.cartRepo.add(productId, userId, quantity);

            res.status(200).send('cart item is added');
        } catch (errr) {
            res.status(400).send("erro in add in cart controller");
        }
    }

    // static getCartItems(req, res) {
    //     const userId = req.userId;
    //     const products = CartItemModel.getAll(userId);
    //     if (!products || products.lenght == 0) {
    //         res.send("Not added in cart");
    //     }
    //     else {
    //         res.status(200).send(products);
    //     }
    // }
    async getCartItems(req, res) {
        const userId = req.userId;
        const products = await this.cartRepo.getAll(userId);
        if (!products || products.lenght == 0) {
            res.send("Not added in cart");
        }
        else {
            res.status(200).send(products);
        }
    }

    // async  delete(req, res) {
    //     const userId = req.userId;
    //     const cartItemId = req.params.id;
    //     console.log(userId, cartItemId);
    //     const error = await this.cartRepo.delete(cartItemId, userId);
    //     if (error) {
    //         return res.send(error);
    //     }
    //     else {
    //         return res.status(200).send("cart Item is removed");
    //     }
    // }
    async delete(req, res) {
        try {
            const userId = req.userId;
            const productId = req.body.productId;

            const delObject = await this.cartRepo.delete(userId, productId);
            console.log(delObject)
            if (delObject > 0)
                return res.status(200).send("cart Item is removed");
            else
                return res.status(200).send("Item not found");

        }
        catch (err) {
            console.log(err)
            return res.send(err);
        }
    }

}