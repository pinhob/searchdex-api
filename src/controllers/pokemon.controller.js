import { getPokemonAbilities } from "../services/pokemon.services.js";

export async function getPokemonAbilitiesHandler(req, res) {
  const pokemon = req.params?.pokemon;

  if (!pokemon) {
    // TODO: handle error
  }

  try {
    const data = await getPokemonAbilities(pokemon);

    return res.status(200).json(data)
  } catch (error) {
    // TODO: hanlde error
  }
}