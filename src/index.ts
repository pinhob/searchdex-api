import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { getPokemonAbilitiesHandler } from './controllers/pokemon.controller';

const app: Express = express();

app.use(cors())

app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).json({ "message": "pong" })
})

app.get('/abilities/:pokemon', (req, res) => {
  getPokemonAbilitiesHandler(req, res);
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  })
}

export default app;