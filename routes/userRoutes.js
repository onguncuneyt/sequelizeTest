const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

Router.get('/', userController.getAllUsers);
Router.get('/list-orders', userController.listOrders);
Router.get('/list-cart', userController.listCart);
Router.post('/', userController.addUser);
Router.post('/add-adress', userController.addAdress);
Router.post('/search-products', userController.searchProduct);
Router.post('/add-to-cart', userController.addToCart);
Router.post('/buy-cart', userController.buyCartItems);

module.exports = Router;
