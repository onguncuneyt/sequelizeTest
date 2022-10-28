const User = require('../models').User;
const Adress = require('../models').Adress;
const Country = require('../models').Country;

module.exports = {
	addUser: async (req, res) => {
		const { userName, email, title, fullAdress, country } = req.body;
		try {
			const countryResult = await Country.findOne({
				where: {
					name: country,
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
				{ include: { model: Adress } },
				{ include: { model: Country } }
			);
			res.json(user);
		} catch (error) {
			console.log(error);
		}
	},
	addAdress: async (req, res) => {
		const { userId, title, fullAdress } = req.body;

		try {
		} catch (error) {
			console.log(error);
		}
	},
	getAllUsers: async (req, res) => {
		const results = await User.findAll({
			attributes: ['userName', 'email'],
			include: [
				{
					model: Adress,
					as: 'Adresses',
					attributes: [
						['title', 'Baslik'],
						['fullAdress', 'Adres'],
					],
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
};
