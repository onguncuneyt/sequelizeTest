const express = require('express');
const Router = express.Router();
const countryController = require('../controllers/countryController');

Router.get('/', countryController.getAllCountries);
Router.post('/', countryController.addCountry);

module.exports = Router;
