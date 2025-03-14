import express, { Express, Request, Response } from 'express';
import { getPokemonAbilitiesHandler } from './controllers/pokemon.controller.js';

const app: Express = express();

app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).json({ "message": "pong" })
})

app.get('/abilities/:pokemon', (req, res) => {
  getPokemonAbilitiesHandler(req, res);
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
})
