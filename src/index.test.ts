import request from 'supertest';
import app from './index';

describe('GET /ping', () => {
  it('should return 200 and pong message', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('pong');
  })
})