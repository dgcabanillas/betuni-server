const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { findOne, create } = require("../database/database.mock.js");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await findOne(User, { where: { username } });
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    res.json({ user: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

exports.register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son necesarios" });
    }

    const existingUser = await findOne(User, { where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await create(User, {
      name,
      username,
      password: hashedPassword,
    });
    const { password: _, ...userWithoutPassword } = createdUser.toJSON();
    res.json({ message: "Usuario creado", user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};