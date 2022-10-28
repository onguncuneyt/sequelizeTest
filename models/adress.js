'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Adress extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Adress.init(
		{
			title: {
				type: DataTypes.STRING(28),
				allowNull: false,
			},
			fullAdress: {
				type: DataTypes.STRING(120),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Adress',
		}
	);
	Adress.associate = (models) => {
		Adress.hasMany(models.userAdressJunc);
	};
	return Adress;
};
