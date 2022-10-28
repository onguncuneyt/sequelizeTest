const Country = require('../models').Country;

module.exports = {
	addCountry: async (req, res) => {
		const { name } = req.body;
		try {
			const result = await Country.create({ name });
			res.json(result);
		} catch (error) {
			console.log(error);
		}
	},
	getAllCountries: async (req, res) => {
		try {
			const result = await Country.findAll();
			res.json(result);
		} catch (error) {
			console.log(error);
		}
	},
};
