const express = require('express');
const Router = express.Router();
const productController = require('../controllers/productController');

Router.get('/', productController.listAllProducts);
Router.post('/', productController.addProduct);

module.exports = Router;
