const BASE_URL = 'https://pokeapi.co/api/v2';
/**
 * Obté la llista dels primers 151 Pokémon
 * @returns {Promise<Array>} Llista de Pokémon amb nom i URL
 */
async function fetchPokemonList() {
    try {
        const resposta = await fetch(`${BASE_URL}/pokemon/?limit=151`);
        if (!resposta.ok) {
            throw new Error("Pokémon no trobat a la regió!");
        }
        const pokemonList = await resposta.json();
        return pokemonList.results;
    } catch (error) {
        console.error(`❌ Error de la Pokédex: ${error.message}`);
    }
}

/**
 * Obté les dades d'un Pokémon per id o nom
 * @param {number|string} idOrName - L'id o nom del Pokémon
 * @returns {Promise<Object>} Les dades completes del Pokémon
 */
async function fetchPokemon(idOrName) {
    try {
        const resposta = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
        if (!resposta.ok) {
            throw new Error("Pokémon no trobat!");
        }
        const pokemon = await resposta.json();
        return pokemon;
    } catch (error) {
        console.error(`❌ Error de la Pokédex: ${error.message}`);
    }
}

/**
 * Obté les dades de l'espècie d'un Pokémon
 * @param {number} id - L'id del Pokémon
 * @returns {Promise<Object>} Les dades de l'espècie
 */
async function fetchSpecies(id) {
    try {
        const resposta = await fetch(`${BASE_URL}/pokemon-species/${id}`);
        if (!resposta.ok) {
            throw new Error("Especie no trobada!");
        }
        const especie = await resposta.json();
        return especie;
    } catch (error) {
        console.error(`❌ Error de la Pokédex: ${error.message}`);
    }
}

/**
 * Obté la cadena evolutiva d'un Pokémon
 * @param {string} url - La URL de la cadena evolutiva
 * @returns {Promise<Object>} Les dades de la cadena evolutiva
 */
async function fetchEvolutionChain(url) {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error("Evolució no trobada!");
        }
        const evolution = await resposta.json();
        return evolution;
    } catch (error) {
        console.error(`❌ Error de la Pokédex: ${error.message}`);
    }
}