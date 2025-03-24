import { NextFunction, Request, Response } from "express";
import { getPokemonAbilities, getAllPokemons } from "../services/pokemon.services";
import { ValidationError } from "../utils/errors";

export async function getPokemonAbilitiesHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
  const pokemon = req.params?.pokemon;

  if (!pokemon) {
    return new ValidationError("Pokemon parameter is required");
  }

  try {
    const abilities = await getPokemonAbilities(pokemon);

    return res.status(200).json(abilities)
  } catch (error) {
    next(error);
  }
}

export async function getAllPokemonsHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const pokemons = await getAllPokemons(); 

    return res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
}