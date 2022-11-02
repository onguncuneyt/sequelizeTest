const User = require('../models').User;
const Adress = require('../models').Adress;
const Country = require('../models').Country;
const SellerProducts = require('../models').SellerProducts;
const Product = require('../models').Product;
const Seller = require('../models').Seller;
const CartItems = require('../models').CartItems;
const sequelize = require('../models');
const Cart = require('../models/').Cart;
const Order = require('../models/').Order;
const { Op } = require('sequelize');

module.exports = {
	addUser: async (req, res) => {
		const { userName, email, title, fullAdress, country } = req.body;
		try {
			const countryResult = await Country.findOne({
				where: {
					name: country.toUpperCase(),
				},
				attributes: ['id'],
			});

			const user = await User.create(
				{
					userName,
					email,
					Adresses: {
						title,
						fullAdress,
					},

					CountryId: countryResult.dataValues.id,
				},
				{ include: { model: Adress, as: 'Adresses' } },
				{ include: { model: Country, as: 'Country' } }
			);
			res.json(user);
		} catch (error) {
			console.log(error);
		}
	},
	addAdress: async (req, res) => {
		const { userId, title, fullAdress } = req.body;

		try {
			await Adress.create({
				UserId: userId,
				title,
				fullAdress,
			});
			res.status(201).json({ status: 'Kayit Basarili' });
		} catch (error) {
			console.log(error);
		}
	},
	getAllUsers: async (req, res) => {
		const results = await User.findAll({
			attributes: ['id', 'userName', 'email'],
			include: [
				{
					model: Adress,
					as: 'Adresses',
					attributes: ['id', 'title', ['fullAdress', 'Adress']],
				},
				{
					model: Country,
					as: 'Country',
					attributes: [['name', 'Ulke']],
				},
			],
		});
		res.json(results);
	},
	listAllProducts: async (req, res) => {
		try {
			const productList = await Product.findAll({
				include: {
					model: Seller,
					as: 'ProductsSellers',
				},
			});

			productList.forEach((element) => {
				element.dataValues.ProductsSellers.forEach((seller) => {
					delete seller.dataValues.seller_product.dataValues.sellerProductId;
				});
			});

			res.json(productList);
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	},
	searchProduct: async (req, res) => {
		try {
			const { keyword } = req.body;

			const productList = await SellerProducts.findAll({
				include: [
					{ model: Seller },
					{
						model: Product,
						where: {
							name: {
								[Op.like]: `%${keyword}%`,
							},
						},
					},
				],
			});

			res.json(productList);
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	},
	listCart: async (req, res) => {
		const { userId } = req.body;
		const cartItems = await User.findOne({
			where: {
				id: userId,
			},

			include: {
				model: Cart,
				where: {
					isOrdered: false,
				},
				include: {
					model: CartItems,
					include: {
						model: SellerProducts,
						include: [{ model: Seller }, { model: Product }],
					},
				},
			},
		});

		res.send(cartItems);
	},
	addToCart: async (req, res) => {
		const { userId, sellerProductId, quantity, adressId } = req.body;

		try {
			const user = await User.findOne({
				where: {
					id: userId,
				},
				include: {
					model: Adress,
					where: {
						id: adressId,
					},
				},
			});

			if (!user) return res.sendStatus(404);

			const userCart = await Cart.findOne({
				where: {
					UserId: userId,
					isOrdered: false,
				},
			});

			const adress = user.dataValues.Adresses[0];
			delete user.dataValues.Adresses;

			var result;
			if (!userCart) {
				const cart = await user.createCart({
					AdressId: adress.dataValues.id,
				});
				result = await CartItems.create({
					CartId: cart.id,
					SellerProductId: sellerProductId,
					quantity: quantity,
				});
				res.json(result);
			} else {
				result = await CartItems.create({
					CartId: userCart.id,
					SellerProductId: sellerProductId,
					quantity: quantity,
				});
				res.json(result);
			}
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	},
	buyCartItems: async (req, res) => {
		try {
			const { userId } = req.body;

			const user = await User.findOne({
				where: {
					id: userId,
				},
				include: {
					model: Cart,
					where: {
						isOrdered: false,
					},
					include: {
						model: CartItems,
						include: {
							model: SellerProducts,
						},
					},
				},
			});

			const orderQuery = [];

			user.dataValues.Carts[0].dataValues.CartItems.forEach((element) => {
				if (orderQuery.length === 0) {
					orderQuery.push({
						CartId: element.CartId,
						SellerId: element.SellerProduct.SellerId,
						UserId: userId,
					});
				} else if (orderQuery.length > 1) {
					orderQuery.forEach((queryElement) => {
						if (!queryElement.SellerId === element.SellerProduct.SellerId) {
							orderQuery.push({
								CartId: element.CartId,
								SellerId: element.SellerProduct.SellerId,
								UserId: userId,
							});
						}
					});
				}
			});

			const orderResult = await Order.bulkCreate(orderQuery);

			res.send(orderResult);
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	},
	listOrders: async (req, res) => {
		try {
			const { userId } = req.body;

			const result = await User.findOne({
				where: {
					id: userId,
				},
				include: {
					model: Cart,
					include: {
						model: CartItems,
						include: {
							model: SellerProducts,
							include: [Seller, Product],
						},
					},
				},
			});

			res.send(result);
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	},

	//belongsToMany iliskili 2 model orn product ve seller
	//ara tabloya iliskili ekleme yapmak icin
	//Seller.findOne yap
	//seller.addProduct(seller,{through:someColumn})
	//add yerine createde olabilir
};
