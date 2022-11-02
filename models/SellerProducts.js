'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class SellerProducts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	SellerProducts.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},

		{
			sequelize,
			modelName: 'SellerProducts',
			indexes: [
				{
					unique: true,
					fields: ['SellerId', 'ProductId'],
				},
			],
		}
	);
	SellerProducts.associate = (models) => {
		// SellerProducts.belongsToMany(models.Cart, {
		// 	onDelete: 'cascade',
		// 	onUpdate: 'cascade',
		// 	through: models.CartItems,
		// });
		SellerProducts.hasMany(models.CartItems, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		SellerProducts.belongsTo(models.Product, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		SellerProducts.belongsTo(models.Seller, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	};
	return SellerProducts;
};
