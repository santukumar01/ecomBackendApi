import { MongoAWSError } from "mongodb";
import ProductModel from "./product.model.js";
import ProductReposetory from "./product.repo.js";

export default class ProductController {

    constructor() {
        this.productRepo = new ProductReposetory();
    }
    // user Model product
    // getALLProducts(req, res) {
    //     const products = ProductModel.getAll();
    //     res.send(products);
    // }

    // for mongoDB // can use trye cath block to catch error
    async getALLProducts(req, res) {
        const products = await this.productRepo.getALL();
        res.send(products);
    }



    // for productModel
    // addProduct(req, res) {
    //     //     console.log(req.body);
    //     //     const { name, desc, imageUrl, catagory, price, size } = req.body;
    //     //     ProductModel.addNewProduct(name, desc, , catagory, price, size);
    //     //     res.send(req.body);

    //     const { name, price, sizes } = req.body;
    //     const newProduct = {
    //         name,
    //         price: parseFloat(price),
    //         // sizes: sizes.split(',');
    //         sizes: sizes,
    //         imageUrl: req.file.filename,
    //     }
    //     const newRecordAdd = ProductModel.addNewProduct(newProduct);
    //     res.send(newRecordAdd);
    // }

    // for mongoDB dataBase
    async addProduct(req, res) {
        const { name, price, sizes, desc, category } = req.body;
        // name, desc, imageUrl, catagory, price, size

        const newRecord = new ProductModel(
            name,
            desc,
            req.file.filename,
            category,
            parseFloat(price),
            sizes);
        console.log(newRecord)
        await this.productRepo.addNewProduct(newRecord)
        res.send(newRecord);
    }


    // for productModel
    // getOneProduct(req, res) {
    //     const id = req.params.id;
    //     const product = ProductModel.getOne(id);
    //     if (!product) {
    //         res.status(404).json({ error: "Product is Found" });
    //     } else {
    //         res.json(product);
    //     }
    // }

    // for mongoDB Database
    async getOneProduct(req, res) {
        const id = req.params.id;
        console.log(id);
        const product = await this.productRepo.getOne(id);
        console.log(product);
        if (!product) {
            res.status(404).json({ error: "Product is Found" });
        } else {
            res.json(product);
        }
    }



    // using quary parameter
    // localhost:3000/api/products/filter?minPrice=30&maxPrice=4000&category=category1
    // filterProduct(req, res) {
    //     const minPrice = req.query.minPrice; // "query" is spelled incorrectly
    //     const maxPrice = req.query.maxPrice; // "query" is spelled incorrectly
    //     console.log(req.query);
    //     // console.log(minPrice, maxPrice);
    //     let products = ProductModel.filter(minPrice, maxPrice); // Change "product" to "products"

    //     if (!products || products.length === 0) { // Check if the array is empty
    //         res.send("Product Not Exist");
    //     } else {
    //         res.send(products);
    //     }
    // }

    // for MongoDB DAtavase
    async filterProduct(req, res) {
        const minPrice = req.query.minPrice; // "query" is spelled incorrectly
        const maxPrice = req.query.maxPrice; // "query" is spelled incorrectly
        console.log(req.query);
        // console.log(minPrice, maxPrice);

        let products = await this.productRepo.filter(minPrice, maxPrice);

        if (!products || products.length === 0) { // Check if the array is empty
            res.send("Product Not Exist");
        } else {
            res.send(products);
        }
    }


    async rateProduct(req, res) {
        try {
            const userId = req.userId;
            // const productId = req.query.productId
            // const rate = req.query.rate;

            // we should take this from body since this is a post req
            const productId = req.body.productId
            const rate = req.body.rate;
            console.log(productId, rate);
            // console.log(userId, req.userId);
            await this.productRepo.rateProduct(userId, productId, rate);

            return res.status(200).send("rating has been added");
        } catch (err) {
            console.log(err);
        }

        // Eoor : for throw keyword
        // try{
        //     ProductModel.rateProduct(userId, productId, rate);
        // }
        // catch(error){
        //     return res.status(400).send(error.message);
        // }
        // return res.status(200).send("rating has been added");
    }


    async averagePrice(req, res) {
        try {
            const result = await this.productRepo.averagePricePerCategory();
            res.send(result);
        }
        catch (err) {
            console.log(err);
        }
    }

}