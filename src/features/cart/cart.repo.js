import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import CartItemModel from "./cartIteams.model.js";
class CartRepository {

    async add(productId, userId, quantity) {
        try {
            const db = getDB();
            const collection = db.collection('cartItem');

            let newCartItem = new CartItemModel(new ObjectId(productId), new ObjectId(userId), quantity);
            await collection.insertOne(newCartItem);
            return newCartItem;

            // finding and update the existing doument->upsert
            // const id = await this.getNextCounter(db);
            // await collection.updateOne(
            //     { productId: new ObjectId(productId), userId: new ObjectId(userId) },
            //     {
            //         $setOnInsert: { _id: id },  //update on insert
            //         $inc: {
            //             quantity: quantity
            //         }
            //     },
            //     {
            //         upsert: true
            //     }
            // )

        } catch (err) {
            console.log(err);
            console.log("err inside repo");
        }
    }


    async getAll(userId) {
        // return cartItems.filter((i) => i.userId == userId);
        try {
            const db = getDB();
            const collection = db.collection('cartItem');

            const cartProduct = await collection.find({ userId: new ObjectId(userId) }).toArray();
            return cartProduct;
        }
        catch (err) {
            console.log(err);
        }
    }
    async delete(userId, productId) {
        try {
            const db = getDB();
            const collection = db.collection('cartItem');
            // deleting an item form cart
            const result = await collection.deleteOne({ userId: new ObjectId(userId), productId: new ObjectId(productId) })
            return result.deletedCount > 0;
        } catch (err) {
            console.log(err);
        }

    }

    async getNextCounter(db) {

        const resultDocument = await db.collection("counters").findOneAndUpdate(
            { _id: 'cartItemId' },
            { $inc: { value: 1 } },
            { returnDocument: 'after' }
        )

        console.log(resultDocument);
        return resultDocument.value.value;  // first value for document
    }



}


export default CartRepository;