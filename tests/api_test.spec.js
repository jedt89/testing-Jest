const request = require('supertest');
const app = require('../index.js');

describe('Pruebas Crud api Equipos', () => {
  it('Se obtiene un Array y un status code 200 como respuesta de la ruta GET /equipos', async () => {
    const resultado = await request(app).get('/equipos');
    const statusCode = resultado.statusCode;
    expect(statusCode).toBe(200);
    expect(resultado.body).toBeInstanceOf(Array);
  });

  it('Al enviar las credenciales correctas en la ruta POST /login se obtiene un Object', async () => {
    const params = {
      username: 'admin',
      password: 1234
    };
    const resultado = await request(app).post('/login').send(params);
    expect(resultado.body).toBeInstanceOf(Object);
  });

  it('Al enviar credenciales incorrectas en la ruta POST /login se obtiene un status code 400', async () => {
    const params = {
      username: 'admin_2',
      password: 12345
    };
    const resultado = await request(app).post('/login').send(params);
    expect(resultado.statusCode).toBe(400);
  });

  it('Al enviar un nuevo jugador en la ruta POST /equipos/:teamID/jugadores junto a un token válido en las cabeceras se obtiene un status code 201', async () => {
    const tokenParams = {
      username: 'admin',
      password: 1234
    };
    const tokenRes = await request(app).post('/login').send(tokenParams);
    const token = tokenRes.body.token;

    const params = {
      name: 'Juanin Juan Jarry',
      position: 7
    };
    const resultado = await request(app)
      .post('/equipos/1/jugadores')
      .set('Authorization', `Bearer ${token}`)
      .send(params);
    expect(resultado.statusCode).toBe(201);
  });
});
