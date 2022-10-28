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
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				autoIncrement: false,
			},
			title: {
				type: DataTypes.STRING(28),
				allowNull: false,
			},
			fullAdress: {
				type: DataTypes.STRING(120),
				allowNull: false,
				validate: {
					len: [10, 120],
				},
			},
		},

		{
			sequelize,
			modelName: 'Adress',
		}
	);
	Adress.associate = (models) => {
		Adress.belongsTo(models.User, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	};
	return Adress;
};
