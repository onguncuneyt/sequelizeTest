'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Country.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
			name: {
				type: DataTypes.STRING(28),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Country',
		}
	);
	Country.associate = (models) => {
		Country.hasMany(models.User, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	};
	return Country;
};
