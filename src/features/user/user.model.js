import { getDB } from "../../config/mongodb.js";
import cartRouter from "../cart/cartIteams.router.js";

export class UserModel {
    // for user model
    // constructor(id , name, email, password, type) {
    //      this.id = id,
    //     this.name = name,
    //         this.email = email,
    //         this.password = password,
    //         this.type = type
    // }

    // for mongoDB  id is selfcreated by them
    constructor(name, email, password, type) {
        this.name = name,
            this.email = email,
            this.password = password,
            this.type = type
    }
    // for local model
    // static SingUp(name, email, password, type) {
    //     let newUser = new UserModel(users.length + 1, name, email, password, type);
    //     users.push(newUser);
    //     return newUser;
    // }

    // for mongodb databases (when using reqpo , then not using this below function for SingUp)
    static async SingUp(name, email, password, type) {
        try {
            //1.  get the db
            const db = getDB();

            // 2. get the collection  / create the users collection
            const collection = db.collection('users')

            // 3. insert the new document
            let newUser = new UserModel(name, email, password, type);
            await collection.insertOne(newUser);

        }
        catch (err) {
            console.log("user not added");
        }
        return newUser;
    }


    static SingIn(email, password) {
        let user = users.find((u) => { return (u.email == email && u.password == password) });
        console.log(user);
        return user;
    }

    static getAll() {
        return users;
    }

};

var users = [
    new UserModel(1, "Admin user", "admin@gmail.com", "password1", "seller"),
    new UserModel(2, "Buyer user", "cus@gmail.com", "password2", "buyer")
]