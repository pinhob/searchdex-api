import request from 'supertest';
import app from './index';

describe('GET /ping', () => {
  it('should return 200 and pong message', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('pong');
  })
})

const pikachuAbilities = {
  name: 'Pikachu',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  abilities: [ { name: 'Lightning Rod' }, { name: 'Static' } ]
}

describe('GET /abilities/:pokemon', () => {
  it('should abilities for a given pokemon', async () => {
    const res = await request(app).get('/abilities/pikachu');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(pikachuAbilities);
  })
})