import { AbilityDetail, PokemonData, PokemonResponse, PokemonResult, AllPokemonsResult } from '../types/pokemon.types.js';
import { formatName, capitalize } from '../utils/formatString.js';

async function getPokemonData(pokemon: string): Promise<PokemonResponse> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return response.json();
}

async function getAbilityDetail(url: string): Promise<string> {
  const response = await fetch(url);
  const data = await response.json();
  
  const englishName = data.names.find(
    (nameEntry: any) => nameEntry.language.name === "en"
  )?.name || data.name;
  
  return englishName;
}

async function fetchAbilityDetails(abilities: PokemonData[]): Promise<AbilityDetail[]> {
  const abilityPromises = abilities.map(async (data) => {
    const englishName = await getAbilityDetail(data.ability.url);
    return {
      name: englishName
    };
  });
  
  return Promise.all(abilityPromises);
}

function sortAbilities(abilities: AbilityDetail[]): AbilityDetail[] {
  return [...abilities].sort((a, b) => 
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}

export async function getPokemonAbilities(pokemon: string): Promise<PokemonResult> {
  try {
    const data = await getPokemonData(pokemon);
    const detailedAbilities = await fetchAbilityDetails(data.abilities);
    const sortedAbilities = sortAbilities(detailedAbilities);

    return {
      name: capitalize(data.name),
      image: data.sprites.front_default,
      abilities: sortedAbilities
    };
  } catch (error) {
    throw new Error("Error getting pokemon data");
  }
}

export async function getAllPokemons(): Promise<AllPokemonsResult[]> {
  try {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
    const { results } = await data.json();

    console.log("🚀 ~ getAllPokemons ~ results:", results)
    const pokemons = results.map((pokemon: any) => (formatName(pokemon.name)))

    console.log("🚀 ~ getAllPokemons ~ pokemons", pokemons)

    return pokemons;
  } catch (error) {
    throw new Error("Error getting all pokemons data");
  }
}

