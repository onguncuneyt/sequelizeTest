'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
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
			modelName: 'User',
		}
	);

	User.associate = (models) => {
		User.hasMany(models.userAdressJunc);
	};
	return User;
};
