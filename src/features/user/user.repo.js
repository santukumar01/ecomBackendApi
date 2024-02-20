// creating class and export

import { getDB } from "../../config/mongodb.js";

// not recomende to use  static function/ method
class UserReposetory {
    async SingUp(newUser) {
        try {
            //1.  get the db
            const db = getDB();

            // 2. get the collection  / create the users collection
            const collection = db.collection('users')

            // 3. insert the new document

            await collection.insertOne(newUser);

        }
        catch (err) {
            console.log("user not added");
        }
        return newUser;

    }
    //  when bcrypt is not using 
    // async SingIn(email, password) {
    //     try {
    //         //1.  get the db
    //         const db = getDB();

    //         // 2. get the collection  / create the users collection
    //         const collection = db.collection('users')

    //         // 3. FIND  the new document
    //         // console.log("inside repo", email, password);
    //         return await collection.findOne({ email, password });
    //     }
    //     catch (err) {
    //         console.log("User not found");
    //     }

    // }

    // with bcrypt
    async SearchByEamil(email) {
        try {
            //1.  get the db
            const db = getDB();

            // 2. get the collection  / create the users collection
            const collection = db.collection('users')

            // 3. FIND  the new document
            return await collection.findOne({ email });
        }
        catch (err) {
            console.log("User not found");
        }

    }

    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection('users')

            // const users = await collection.find();  // returing cursur
            // A cursor in the context of databases is a pointer or iterator for traversing the results of a query. In the code you provided, when you call collection.find(), it returns a cursor

            const users = await collection.find().toArray();

            console.log(users);
            return users;
        }
        catch (err) {
            console.log("User not found");
        }
    }

}

export default UserReposetory