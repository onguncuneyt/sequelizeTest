'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Cart.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
			isOrdered: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Cart',
		}
	);

	Cart.associate = (models) => {
		Cart.belongsTo(models.User, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		// Cart.belongsToMany(models.SellerProducts, {
		// 	onDelete: 'cascade',
		// 	onUpdate: 'cascade',
		// 	through: models.CartItems,
		// });
		Cart.hasMany(models.Order, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		Cart.belongsTo(models.Adress, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		Cart.hasMany(models.CartItems, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	};
	return Cart;
};
