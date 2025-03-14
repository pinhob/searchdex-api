interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

interface PokemonResponse {
  abilities: PokemonAbility[];
}

export async function getPokemonAbilities(pokemon:string): Promise<PokemonResponse> {
  try {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    return result.json()
  } catch (error) {
    throw new Error("Error getting pokemon data");
  }
}

