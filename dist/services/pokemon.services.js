export async function getPokemonAbilities(pokemon) {
    try {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        return result.json();
    }
    catch (error) {
        throw new Error("Error getting pokemon data");
    }
}
