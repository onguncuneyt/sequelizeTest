const Product = require('../models').Product;
module.exports = {
	addProduct: async (req, res) => {
		const { name } = req.body;
		const product = await Product.create(
			{ name },
			{
				attributes: ['name'],
			}
		);
		res.status(201).json(product);
	},
	listAllProducts: async (req, res) => {
		const results = await Product.findAll({
			attributes: ['name'],
		});
		res.json(results);
	},
};
