import express from 'express';
import ProductController from './product.controller.js';


import { upload } from '../user/middleware/fileUpload.middleware.js';

// intinlizing the route
const productRouter = express.Router();

const productcontroller = new ProductController();

// all the paths to controller method
// localhost:3000/api/products
// productRouter.get('/', productcontroller.getALLProducts);
productRouter.get('/', (req, res) => {
    productcontroller.getALLProducts(req, res);
});

productRouter.post('/rate', (req, res) => {
    productcontroller.rateProduct(req, res);
});

// productRouter.post('/', upload.single('imageUrl'), productcontroller.addProduct);
productRouter.post('/', upload.single('imageUrl'), (req, res) => {
    productcontroller.addProduct(req, res);
});
productRouter.get('/filter', (req, res) => {
    productcontroller.filterProduct(req, res);
});
productRouter.get('/averagePrice', (req, res) => {
    productcontroller.averagePrice(req, res);
});

// productRouter.get('/:id', productcontroller.getOneProduct);
productRouter.get('/:id', (req, res) => {
    productcontroller.getOneProduct(req, res);
});



export default productRouter;

