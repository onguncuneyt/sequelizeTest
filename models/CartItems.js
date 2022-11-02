'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CartItems extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	CartItems.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'CartItems',
		}
	);

	CartItems.associate = (models) => {
		CartItems.belongsTo(models.SellerProducts, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		CartItems.belongsTo(models.Cart, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	};
	return CartItems;
};
