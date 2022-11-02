const express = require('express');
const Router = express.Router();
const sellerController = require('../controllers/sellerController');

Router.get('/', sellerController.getAllSellers);
Router.get('/list-sellers-product', sellerController.listSellersProducts);
Router.get('/list-orders', sellerController.listOrders);
Router.post('/', sellerController.addSeller);
Router.post('/add-product', sellerController.addProductToSeller);

module.exports = Router;
