const Router = require('express').Router();
const userRoutes = require('./userRoutes');
const countryRoutes = require('./countryRoutes');

Router.use('/user', userRoutes);
Router.use('/country', countryRoutes);

module.exports = Router;
