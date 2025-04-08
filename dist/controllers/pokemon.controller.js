import { getPokemonAbilities, getAllPokemons } from "../services/pokemon.services";
import { ValidationError } from "../utils/errors";
export async function getPokemonAbilitiesHandler(req, res, next) {
    const pokemon = req.params?.pokemon;
    if (!pokemon) {
        return new ValidationError("Pokemon parameter is required");
    }
    try {
        const abilities = await getPokemonAbilities(pokemon);
        return res.status(200).json(abilities);
    }
    catch (error) {
        next(error);
    }
}
export async function getAllPokemonsHandler(req, res, next) {
    try {
        const pokemons = await getAllPokemons();
        return res.status(200).json(pokemons);
    }
    catch (error) {
        next(error);
    }
}
