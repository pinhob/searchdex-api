export interface AbilityDetail {
    name: string;
}

export interface PokemonData {
  ability: {
    name: string;
    url: string;
  },
  is_hidden: boolean;
  slot: number;
}

export interface PokemonResponse {
  abilities: PokemonData[];
  name: string;
  sprites: {
    front_default: string;
  }
}

export interface PokemonResult {
  name: string;
  image: string;
  abilities: AbilityDetail[];
}
