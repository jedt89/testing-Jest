const pkg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: process.env.POOL,
  database: 'futscript',
  allowExitOnIdle: true
});

const getTeams = async () => {
  const query = 'SELECT * FROM equipos';

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getPlayers = async (teamID) => {
  const query = 'SELECT * FROM jugadores WHERE id_equipo = $1';
  try {
    const { rows } = await pool.query(query, [teamID]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const addTeam = async ({ name }) => {
  const query = 'INSERT INTO equipos(name) VALUES($1) RETURNING *';

  try {
    const { rows } = await pool.query(query, [name]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const addPlayer = async ({ teamID, name, position }) => {
  const query =
    'INSERT INTO jugadores(id_equipo, name, position) VALUES($1, $2, $3) RETURNING *';

  try {
    const { rows } = await pool.query(query, [teamID, name, position]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { getTeams, addTeam, getPlayers, addPlayer };
