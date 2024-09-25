const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Bet = sequelize.define('Bet', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	betAmount: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	guessedNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	drawnNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	won: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
});

Bet.sync();

module.exports = Bet;
