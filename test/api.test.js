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

  it('should not found a cat by id', async () => {
    const res = await request(app)
      .get('/api/v1/cats/1')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(404);
    //expect(res.body).toBeDefined();
  });
});
