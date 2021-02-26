import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Users', async() => {
  beforeAll( async() => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('should be able to create a new user', async() => {
    const response = await request(app).post('/users').send({
      email: 'teste@example.com',
      name: 'Teste Teste',
    });

    expect(response.status).toBe(201);
  });

  // repetindo o teste com o mesmo email, para testar se irá retornar o erro de email existente, se retornar o teste foi um sucesso
  it('should not be able to create a user with exists email', async() => {
    const response = await request(app).post('/users').send({
      email: 'teste@example.com',
      name: 'Teste Teste',
    });

    expect(response.status).toBe(400);
  })
});
