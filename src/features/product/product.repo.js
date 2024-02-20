import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ProductReposetory {
    constructor() {
        this.collection = 'products'
    }

    async addNewProduct(newProduct) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.insertOne(newProduct);
        } catch (err) {
            console.log("Error inside repo");
        }

    }

    async getALL() {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            return products;
        } catch (err) {
            console.log("error inside getALL");
        }
    }

    async getOne(id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.findOne({ _id: new ObjectId(id) });
            console.log(products);
            return products;
        } catch (err) {
            console.log("error inside get");
        }
    }

    async filter(minPrice, maxPrice) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);

            const products = await collection.find().toArray();
            const results = products.filter((product) => {
                return (
                    (!minPrice || product.price >= minPrice) &&
                    (!maxPrice || product.price <= maxPrice)
                )
            })
            return results;

            // creating filter for find function of mongoDB
            // let filterexp = {};
            // if (minPrice) {
            //     filterexp.price = { $gte: parseFloat(minPrice) };  
            // }
            // if (maxPrice) {
            //     filterexp.price = { ...filterexp.price , $lte: parseFloat(maxPrice) };
            // }
            // return await collection.find(filterexp).toArray();


            // when we are using operator
            // if (minPrice) {
            //     filterexp.price = {  $gte: parseFloat(minPrice) };
            // }
            // if (category) {
            //      filterexp ={$and : [  { category : category } ,  filterexp  ]}
            //   
            // }
            // if (maxPrice) {
            //    filterexp ={$and : [  { $lte: parseFloat(manPrice) } ,  filterexp  ]}
            //     
            // }
            // return await collection.find(filterexp).toArray();
            //  category = ['cat1, 'cat2']  -> needs to conveted
            // the url gving us as string needes to convertd in arra format
            // category = JSON.parse(category.replace(/'/g , ' "'))  // replace ' 6t " 
            // when we want multiple category
            // if (category) {
            //      filterexp ={$and : [  { category : {$in :category} } ,  filterexp  ]}

            // projection opertor
            // return await collection.find(filterexp).project({name : 1, price : 0 , _id :0 , rating :{$slice :1}}).toArray();  //1-for seen , 2 -> dont show
            // rating :{$slice :1}}  //first one rating
            // rating :{$slice :-1}}  //last rating

        } catch (err) {
            console.log("err inside product repo")
        }
    }

    // async rateProduct(userId, productId, rate) {
    //     try {
    //         const db = getDB();
    //         const collection = db.collection(this.collection);

    //         // console.log(userId);
    //         const product = await collection.findOne({ _id: new ObjectId(productId) });

    //         // Find the rating
    //         const userRating = product?.rating?.find(r => r.userId == userId);

    //         console.log(userRating);
    //         console.log(rate);

    //         if (userRating) {
    //             // upadtingythe ratring
    //             await collection.updateOne(
    //                 { _id: new ObjectId(productId), "rating.userId": new ObjectId(userId) },
    //                 {
    //                     $set: {
    //                         "rating.$.rate": rate
    //                     }
    //                 },

    //             );

    //         }
    //         else {
    //             await collection.updateOne(
    //                 { _id: new ObjectId(productId) },
    //                 { $push: { rating: { userId, rate } } }
    //             );
    //         }

    //     }
    //     catch (err) {
    //         console.log("err inside product repo")
    //     }
    // }


    async rateProduct(userId, productId, rate) {
        const db = getDB();
        const collection = db.collection(this.collection);
        //    remove exist entry 
        await collection.updateOne({
            _id: new ObjectId(productId)
        }, {
            $pull: { rating: { userId: new ObjectId(userId) } }
        })
        // add the new rating
        await collection.updateOne(
            { _id: new ObjectId(productId) },
            { $push: { rating: { userId: new ObjectId(userId), rate } } }
        );

    }


    async averagePricePerCategory() {
        try {
            const db = getDB();
            return await db.collection(this.collection).aggregate([
                {
                    $group: {
                        _id: "$catagory",
                        averagePrice: { $avg: "$price" }
                    }
                }
            ]).toArray();


        } catch (err) {
            console.log(err);
        }

    }

}

export default ProductReposetory;

