'use strict';
const { Model } = require('sequelize');
const User = require('./').user;
const Adress = require('./').adress;
module.exports = (sequelize, DataTypes) => {
	class userAdressJunc extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	userAdressJunc.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
		},
		{
			sequelize,
			modelName: 'userAdressJunc',
		}
	);

	Order.associate = (models) => {
		userAdressJunc.belongsTo(User);
		userAdressJunc.belongsTo(Adress);
	};

	return userAdressJunc;
};
