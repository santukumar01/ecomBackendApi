import OrderRepo from "./order.repo.js";

export default class OrderController {

    constructor() {
        this.orderRepo = new OrderRepo();
    }

    async placeOrder(req, res) {
        try {
            const userId = req.userId;
            await this.orderRepo.placeOrder(userId);
            res.send("order is Placed");
        }
        catch (err) {
            console.log(err);
        }
    }

}