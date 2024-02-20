import { UserModel } from "../user/user.model.js";
export default class ProductModel {

    //     for userModel
    // constructor(id, name, desc, imageUrl, catagory, price, size) {
    //     this.id = id,
    //         this.name = name,
    //         this.desc = desc,
    //         this.imageUrl = imageUrl,
    //         this.catagory = catagory,
    //         this.price = price,
    //         this.size = size
    // }

    constructor(name, desc, imageUrl, catagory, price, size) {
        this.name = name,
            this.desc = desc,
            this.imageUrl = imageUrl,
            this.catagory = catagory,
            this.price = price,
            this.size = size
    }

    static getAll() {
        return products;
    }

    static addNewProduct(product) {
        product.id = products.length + 1;
        products.push(product);
        return product;
    }

    static getOne(id) {
        const result = products.find((product) => product.id == id);
        return result;
    }

    static filter(minPrice, maxPrice) {
        const results = products.filter((product) => {
            return (
                (!minPrice || product.price >= minPrice) &&
                (!maxPrice || product.price <= maxPrice)
            )
        })
        return results;
    }


    static rateProduct(userId, productId, rate) {
        // 1. validatuing the user
        const user = UserModel.getAll().find((u) => u.id == userId);

        if (!user) {
            return "User Not Found";
        }

        // rewrite the above error in try catch block and throw keyword
        // user-defined error
        // if(!user){
        //     throw new Error("User Not Found")
        // }
        // if(!user){
        //     throw new ApplicationError("User Not Found" , 404)
        // }

        //2. validating the peroduct

        const product = products.find((p) => p.id == productId);

        if (!product) {
            return "Product not found";
        }
        // if(!product){
        //     throw new Error("Product Not Found")
        // }

        // 3. if the rating iis not present 
        if (!product.rating) {
            product.rateing = [];
            product.rateing.push({ userId: userId, rating: rate })
        }
        else {
            // 4. user want to update rating
            const exsitRatingIndex = product.rateing.findIndex((r) => r.userId === userId);
            if (exsitRatingIndex >= 0) {    // if not found then -1
                product.rating[exsitRatingIndex] = ({ userId: userId, rateing: rate });
            }
            else {
                product.rateing.push({ userId: userId, rating: rate });
            }
        }

    }

}

let products = [
    new ProductModel(1, "apple", "created by apple", "imageUrl", "cat1", 3100, "small"),
    new ProductModel(2, "mango", "created by apple", "imageUrl", "cat2", 300, "small"),
    new ProductModel(3, "apple", "created by apple", "imageUrl", "cat1", 3500, "small"),
]