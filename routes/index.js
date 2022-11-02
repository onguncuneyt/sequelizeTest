const Router = require('express').Router();
const userRoutes = require('./userRoutes');
const countryRoutes = require('./countryRoutes');
const sellerRoutes = require('./sellerRoutes');
const productRoutes = require('./productRoutes');

Router.use('/user', userRoutes);
Router.use('/country', countryRoutes);
Router.use('/seller', sellerRoutes);
Router.use('/product', productRoutes);

module.exports = Router;
