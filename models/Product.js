'use strict';
const { Model } = require('sequelize');
const seller_product = require('./').seller_product;

module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Product.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
			name: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Product',
		}
	);

	Product.associate = (models) => {
		// Product.belongsToMany(models.Seller, {
		// 	onDelete: 'cascade',
		// 	onUpdate: 'cascade',
		// 	through: models.SellerProducts,
		// });
		Product.hasMany(models.SellerProducts, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	};
	return Product;
};
