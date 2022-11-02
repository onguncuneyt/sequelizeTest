const Seller = require('../models').Seller;
const Product = require('../models').Product;
const SellerProducts = require('../models').SellerProducts;
const CartItems = require('../models').CartItems;
const Cart = require('../models').Cart;
const Order = require('../models').Order;
const Adress = require('../models').Adress;
const { Op } = require('sequelize');

module.exports = {
	addSeller: async (req, res) => {
		try {
			const { userName, email } = req.body;
			const seller = await Seller.create({
				userName,
				email,
				attributes: ['userName', 'email'],
			});

			res.status(201).json(seller);
		} catch (error) {
			console.log(error);
		}
	},
	getAllSellers: async (req, res) => {
		try {
			const results = await Seller.findAll({});
			res.json(results);
		} catch (error) {
			console.log(error);
		}
	},
	addProductToSeller: async (req, res) => {
		try {
			const { sellerId, productName, price, quantity } = req.body;

			const product = await Product.findOne({
				where: {
					name: {
						[Op.like]: `%${productName}%`,
					},
				},
			});

			const seller = await Seller.findByPk(sellerId);

			if (!product) return res.status(403).send('Product Could Not Found');

			const result = await SellerProducts.create({
				SellerId: seller.id,
				ProductId: product.id,
				quantity,
				price,
			});
			if (!result) return res.status(422).send('Product Already Exist in Your Selling List');
			res.json(result);
		} catch (error) {
			res.send(error);
			console.log(error);
		}
	},
	listSellersProducts: async (req, res) => {
		try {
			const { sellerId } = req.body;

			const result = await Seller.findOne({
				where: {
					id: sellerId,
				},
				include: {
					model: SellerProducts,
					include: {
						model: Product,
					},
				},
			});

			res.status(200).json(result);
		} catch (error) {
			res.send(error);
			console.log(error);
		}
	},
	listOrders: async (req, res) => {
		try {
			const { sellerId } = req.body;

			const result = await Order.findAll({
				where: {
					SellerId: sellerId,
				},
				include: {
					model: Cart,
					include: [
						{
							model: CartItems,
							include: {
								model: SellerProducts,
								include: {
									model: Product,
								},
							},
						},
						{
							model: Adress,
						},
					],
				},
			});

			res.send(result);
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	},
};
