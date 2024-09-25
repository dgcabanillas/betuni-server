const Bet = require('../models/bet.model');
const User = require('../models/user.model');
const { findByPk } = require("../database/database.mock.js");

exports.placeBet = async (req, res) => {
	const { userId, betAmount, guessedNumber } = req.body;
	try {
		const user = await findByPk(User, userId);
		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}

		if (betAmount <= 0 || betAmount > user.balance) {
			return res.status(400).json({ message: 'Apuesta inválida o saldo insuficiente' });
		}

		if (guessedNumber < 1 || guessedNumber > 9) {
			return res.status(400).json({ message: 'Número fuera de rango, debe ser entre 1 y 9' });
		}

		let won = false;
		const drawnNumber = Math.floor(Math.random() * 9) + 1;
		if (guessedNumber === drawnNumber) {
			user.balance += betAmount * 10;
			won = true;
		} else {
			user.balance -= betAmount;
		}

		await user.save();

		await Bet.create({
			userId: user.id,
			betAmount,
			guessedNumber,
			drawnNumber,
			won,
		});

		res.json({ message: won ? '¡Ganaste!' : 'Perdiste', drawnNumber, balance: user.balance, won });
	} catch (error) {
		res.status(500).json({ message: 'Error al realizar la apuesta' });
	}
};
