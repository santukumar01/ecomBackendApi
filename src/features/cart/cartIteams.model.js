//productd, userId , quantity

export default class CartItemModel {
    // constructor(productId, userId, qunatity, id) {
    //     this.productId = productId;
    //     this.userId = userId;
    //     this.qunatity = qunatity;
    //     this.id = id;
    // }
    constructor(productId, userId, quantity) {
        // this._id = productId;
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
    }

    // static add(productId, userId, quantity) {
    //     let newCartItem = new CartItemModel(productId, userId, quantity);
    //     newCartItem.id = cartItems.length + 1;
    //     cartItems.push(newCartItem);
    //     // console.log(newCartItem);
    //     return newCartItem;
    // }

    // static getAll(userId) {
    //     return cartItems.filter((i) => i.userId == userId);
    // }

    // static delete(cartItemId, userId) {
    //     const index = cartItems.findIndex((i) => i.id == cartItemId && i.userId == userId);

    //     if (index == -1) {
    //         return "Item not found";
    //     }
    //     else {
    //         cartItems.splice(index, 1);
    //     }
    // }



}

var cartItems = [
    new CartItemModel(1, 2, 1, 1),
    new CartItemModel(2, 2, 2, 2)
]