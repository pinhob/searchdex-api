interface Ability {
  ability: {
    name: string;
    url: string;
  }
}

interface PokemonData {
  ability: {
    name: string;
    url: string;
  },
  is_hidden: boolean;
  slot: number;
}

interface PokemonResponse {
  abilities: PokemonData[];
}

async function getPokemonData(pokemon: string): Promise<PokemonResponse> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return response.json();
}

function sortAbilities(abilities: Ability[]): Ability[] {
  return abilities.sort(
    (a, b) => a.ability.name
      .toLowerCase()
      .localeCompare(b.ability.name.toLowerCase())
  );
}

export async function getPokemonAbilities(pokemon:string): Promise<Ability[]> {
  try {
    const data = await getPokemonData(pokemon);
    const abilities = sortAbilities(data.abilities);

    return abilities;
  } catch (error) {
    throw new Error("Error getting pokemon data");
  }
}

