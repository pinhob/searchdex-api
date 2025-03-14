import express from 'express';
import { getPokemonAbilitiesHandler } from './controllers/pokemon.controller.js';
const app = express();

app.get('/ping', (req, res) => {
  res.status(200).json({ "message": "pong" })
})

app.get('/abilities/:pokemon', getPokemonAbilitiesHandler)

app.listen(3000)
