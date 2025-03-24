import { AbilityDetail, PokemonData, PokemonResponse, PokemonResult, AllPokemonsResult } from '../types/pokemon.types';
import { ApiError, AppError, NotFoundError } from '../utils/errors.js';
import { formatName, capitalize } from '../utils/formatString';

async function getPokemonData(pokemon: string): Promise<PokemonResponse> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError(`Pokemon ${pokemon}`);
      }

      throw new ApiError(`Failed to fetch Pokemon: ${response.statusText}`);
    }

    return response.json();  
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new ApiError('Failed to connect to PokeAPI'); 
  }
  
}

async function getAbilityDetail(url: string): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError(`Failed to fetch ability: ${response.statusText}`);
    }

    const data = await response.json();
    
    const englishName = data.names.find(
      (nameEntry: any) => nameEntry.language.name === "en"
    )?.name || data.name;
    
    return englishName; 
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new ApiError('Failed to connect to PokeAPI'); 
  }
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
    const data = await getPokemonData(pokemon);
    const detailedAbilities = await fetchAbilityDetails(data.abilities);
    const sortedAbilities = sortAbilities(detailedAbilities);

    return {
      name: capitalize(data.name),
      image: data.sprites.front_default,
      abilities: sortedAbilities
    };
}

export async function getAllPokemons(): Promise<AllPokemonsResult[]> {
    try {
      const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");

      if (!data.ok) {
        throw new ApiError(`Failed to fetch Pokemons: ${data.statusText}`);
      }

      const { results } = await data.json();

      const pokemons = results.map((pokemon: any) => (formatName(pokemon.name)))

      return pokemons;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new ApiError('Failed to connect to PokeAPI'); 
    }
}

