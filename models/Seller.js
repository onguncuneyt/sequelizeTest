'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Seller extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Seller.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
			userName: {
				type: DataTypes.STRING(28),
				allowNull: false,
			},

			email: {
				type: DataTypes.STRING(28),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Seller',
		}
	);

	Seller.associate = (models) => {
		// Seller.belongsToMany(models.Product, {
		// 	onDelete: 'cascade',
		// 	onUpdate: 'cascade',
		// 	through: models.SellerProducts,
		// });
		Seller.hasMany(models.Order, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		Seller.hasMany(models.SellerProducts, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	};
	return Seller;
};
