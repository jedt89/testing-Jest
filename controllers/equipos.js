const consultas = require('../db/consultas.js');
const { getTeams, addTeam } = consultas;

const obtenerEquipos = async (req, res) => {
  try {
    const equipos = await getTeams();
    res.json(equipos || []);
  } catch (error) {
    return res.status(400).json({ message: 'Error al obtener los equipos' });
  }
};

const agregarEquipo = async (req, res) => {
  const name = req.body;
  await addTeam(name);
  return res
    .status(201)
    .json({ message: 'Jugador agregado exitosamente', name });
};

module.exports = { obtenerEquipos, agregarEquipo };
