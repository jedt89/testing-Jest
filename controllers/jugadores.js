const consultas = require('../db/consultas.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { getPlayers, addPlayer } = consultas;

const obtenerJugadores = async (req, res) => {
  try {
    const { teamID } = req.params;
    const jugadores = await getPlayers(teamID);
    res.json(jugadores || []);
  } catch (error) {
    return res.status(400).json({ message: 'Error al obtener los jugadores' });
  }
};

const registrarJugador = async (req, res) => {
  try {
    const tokenBearer = req.headers['authorization'];
    const token = tokenBearer.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.user !== 'admin') {
      return res
        .status(403)
        .json({ message: 'No tienes permisos para realizar esta acción' });
    }

    const { teamID } = req.params;
    const { name, position } = req.body;
    await addPlayer({ teamID, name, position });
    return res.status(201).json({ message: 'Jugador agregado exitosamente' });
  } catch (error) {
    return res.status(400).json({ message: 'Error al agregar el jugador' });
  }
};

module.exports = { obtenerJugadores, registrarJugador };
