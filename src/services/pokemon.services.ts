import { AbilityDetail, PokemonData, PokemonResponse, PokemonResult, AllPokemonsResult } from '../types/pokemon.types.js';
import { ApiError, AppError, NotFoundError } from '../utils/errors.js';
import { formatName, capitalize } from '../utils/formatString.js';
import memcacheClient from '../config/memcached.js';

async function getPokemonData(pokemon: string): Promise<PokemonResponse> {
  const CACHE_KEY = `pokemon_${pokemon}`;

  try {
    const cacheData = await memcacheClient.get<PokemonResponse>(CACHE_KEY);

    if (cacheData && cacheData.value) {
      console.info('Returning pokemon data from cache');
      return cacheData.value;
    }

    console.info('Cache miss, fetching pokemon data from API');
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError(`Pokemon ${pokemon}`);
      }

      throw new ApiError(`Failed to fetch Pokemon: ${response.statusText}`);
    }

    const data = await response.json();

    await memcacheClient.set(CACHE_KEY, data, { lifetime: 0});
    console.info(`${pokemon} data saved to cache`);

    return data;  
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new ApiError('Failed to connect to PokeAPI'); 
  }
  
}

async function getAbilityDetail(url: string): Promise<string> {
  const CACHE_KEY = `ability_${url}`;

  try {
    const cacheData = await memcacheClient.get<any>(CACHE_KEY);

    if (cacheData && cacheData.value) {
      console.info('Returning ability data from cache');
      return cacheData.value;
    }

    console.info('Cache miss, fetching ability data from API');
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError(`Failed to fetch ability: ${response.statusText}`);
    }

    const data = await response.json();
    
    const englishName = data.names.find(
      (nameEntry: any) => nameEntry.language.name === "en"
    )?.name || data.name;


    await memcacheClient.set(CACHE_KEY, englishName, { lifetime: 0});
    
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
    const CACHE_KEY = 'all_pokemons';
    
    try {
      const cachedData = await memcacheClient.get<AllPokemonsResult[]>(CACHE_KEY);
      
      if (cachedData && cachedData.value) {
        console.info('Returning pokemons from cache');
        return cachedData.value;
      }
      
      console.info('Cache miss, fetching all pokemons list from API');
      const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");

      if (!data.ok) {
        throw new ApiError(`Failed to fetch Pokemons: ${data.statusText}`);
      }

      const { results } = await data.json();

      const pokemons = results.map((pokemon: any) => (formatName(pokemon.name)));
      
      // Salva no cache sem prazo de validade (0)
      await memcacheClient.set(CACHE_KEY, pokemons, { lifetime: 0 });
      console.info('Pokemons list saved to cache');

      return pokemons;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new ApiError('Failed to connect to PokeAPI'); 
    }
}

