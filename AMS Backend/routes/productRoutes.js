import express from 'express';

import productController from '../controller/productController.js';

const router = express.Router();

router.post('/createProduct', productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.get('/getProductCategory/:category', productController.getProductCategory);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/filterproducts', productController.getFilteredProducts);
router.get('/getProductsByLocation/:location', productController.getProductsByLocation);
export default router;
