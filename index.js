const express = require('express');
const { json } = require('express');
const jugadores = require('./controllers/jugadores.js');
const equipos = require('./controllers/equipos.js');
const login = require('./controllers/login.js');

const app = express();
app.use(json());
const { obtenerJugadores, registrarJugador } = jugadores;
const { obtenerEquipos, agregarEquipo } = equipos;
const { loginUser } = login;

app.get('/equipos', obtenerEquipos);
app.post('/equipos', agregarEquipo);
app.get('/equipos/:teamID/jugadores', obtenerJugadores);
app.post('/equipos/:teamID/jugadores', registrarJugador);
app.post('/login', loginUser);

app.listen(3000, console.log('SERVER ON'));

module.exports = app;
