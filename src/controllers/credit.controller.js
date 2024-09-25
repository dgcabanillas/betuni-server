const User = require("../models/user.model");
const { findByPk } = require("../database/database.mock.js");

exports.addCredit = async (req, res) => {
  const { id, amount } = req.body;
  try {
    const user = await findByPk(User, id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (amount > 0) {
      user.balance += amount;
      await user.save();
      res.json({
        message: `Se agregaron S/. ${amount} a su crédito`,
        balance: user.balance,
      });
    } else {
      res.status(400).json({ message: "El crédito debe ser mayor a 0" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al agregar crédito" });
  }
};

exports.getCredits = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await findByPk(User, id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los créditos" });
  }
};
