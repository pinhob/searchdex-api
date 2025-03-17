import { Request, Response } from "express";
import { getPokemonAbilities, getAllPokemons } from "../services/pokemon.services";

export async function getPokemonAbilitiesHandler(req: Request, res: Response): Promise<Response> {
  const pokemon = req.params?.pokemon;

  if (!pokemon) {
    return res.status(400).json({ error: "Pokemon parameter is required" });
  }

  try {
    const abilities = await getPokemonAbilities(pokemon);

    return res.status(200).json(abilities)
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetching Pokemon abilities" });
  }
}

export async function getAllPokemonsHandler(req: Request, res: Response): Promise<Response> {
  try {
    const pokemons = await getAllPokemons(); 

    return res.status(200).json(pokemons);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetching Pokemon abilities" });
  }
}