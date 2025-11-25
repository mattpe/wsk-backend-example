import request from 'supertest';
import app from '../src/app'; // your Express app
import {closePool} from '../src/utils/database';

afterAll(async () => {
  await closePool();
});

describe('GET /api/v1/cats', () => {
  it('should return a list of cats', async () => {
    const res = await request(app)
      .get('/api/v1/cats')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should NOT FOUND a cat by id', async () => {
    const res = await request(app)
      .get('/api/v1/cats/1')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(404);
    //expect(res.body).toBeDefined();
  });
});

describe('Test User endpoints', () => {
  // testi feilaa, koska userRouterista puuttu syötteen validointi
  // ja palvelin palauttaa väärän virhekoodin
  // missing field in request body
  describe('POST /api/v1/users FAIL', () => {
    it('should FAIL to create a new user', async () => {
      const newUser = {
        name: 'Test User',
        //username: 'testuser',
        email: 'testuser@example.com',
        role: 'user',
        password: 'password123',
      };
      const res = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .set('Accept', 'application/json');
      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  // Succesfull registration
  describe('POST /api/v1/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@example.com',
        role: 'user',
        password: 'password123',
      };
      const res = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .set('Accept', 'application/json');
      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result.user_id).toBeDefined();
    });
    // TODO: testikäyttäjä pitää poistaa tietokannasta testien
    // suorittamisen jälkeen joko DELETE endpointin kautta tai
    // sql-yhteydellä afterAll-hookissa
  });


  describe('GET /api/v1/users', () => {
    it('should return a list of users', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});

describe('Test Authentication endpoints', () => {
  let token;
  describe('POST /api/v1/auth/login', () => {
    it('should login a user and return a token', async () => {
      const user = {
        username: 'testuser',
        password: 'password123',
      };
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .set('Accept', 'application/json');
      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.token).toBeDefined();
      token = res.body.token;
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return user details based on token auth', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');
      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
    });
  });
});
