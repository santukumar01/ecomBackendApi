import { MongoClient } from "mongodb";

// connnecting string to server of mongodb

const url = process.env.DB_URL;
console.log(url);
let client;

export const connectToMongoDb = () => {
    MongoClient.connect(url)   // this is promise take a look
        .then(c => {
            client = c;
            console.log("Mongodb is connected");
            // createCounter(c.db())
            createIndexes(c.db());
        }).catch(err => {
            console.log(err);
        })
}


export const getDB = () => {
    return client.db();  //return ecomdb
}

const createCounter = async (db) => {
    const existingCounter = await db.collection('counters').findOne({ _id: 'cartItemId' });
    if (!existingCounter) {
        await db.collection('counters').insertOne({ _id: 'cartItemId', value: 0 })
    }
}

// creatign a single index
const createIndexes = async (db) => {
    try {
        await db.collection("products").createIndex({ price: 1 }) // 1 ->for asecding oreder  // single index
        await db.collection("products").createIndex({ name: 1, category: -1 }) // -1 ->for dasecding oreder  // compuding index
        await db.collection("products").createIndex({ desc: 1 }) // 1 ->for asecding oreder  //  text index

    } catch (err) {
        console.log(err);
    }

}