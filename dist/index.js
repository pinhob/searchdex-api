import express from 'express';
import cors from 'cors';
import { getPokemonAbilitiesHandler, getAllPokemonsHandler } from './controllers/pokemon.controller';
import { errorHandler } from './middlewares/errorHandler';
const app = express();
app.use(cors());
app.get('/ping', (_req, res) => {
    res.status(200).json({ "message": "pong" });
});
app.get('/abilities/:pokemon', getPokemonAbilitiesHandler);
app.get('/pokemons', getAllPokemonsHandler);
app.use(errorHandler);
if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.info('Server running on port 3000');
    });
}
export default app;
