const params = new URLSearchParams(window.location.search);
const pokemonId = params.get('id');

async function loadPokemonDetails() {
    try {
        const pokemonData = await fetchPokemon(pokemonId);
        const speciesData = await fetchSpecies(pokemonId);
        const evolutionData = await fetchEvolutionChain(speciesData.evolution_chain.url);
        renderPokemonDetails(pokemonData, speciesData, evolutionData);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
    }
}

function renderPokemonDetails(pokemonData, speciesData, evolutionData) {
    
    const nameDiv = document.getElementById('pokemonName');
    const name = document.createElement('h2');
    name.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    nameDiv.appendChild(name);

    const imageDiv = document.getElementById('pokemonImage');
    const img = document.createElement('img');
    img.src = pokemonData.sprites.front_default;
    imageDiv.appendChild(img);

    const statsDiv = document.getElementById('pokemonStats');
    pokemonData.stats.forEach(stat => {
        const statElement = document.createElement('p');
        statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsDiv.appendChild(statElement);
    });

    const movesDiv = document.getElementById('pokemonMoves');
    pokemonData.moves.slice(0, 10).forEach(move => {
        const moveElement = document.createElement('p');
        moveElement.textContent = move.move.name;
        movesDiv.appendChild(moveElement);
    });

    renderEvolution(evolutionData);
}

async function renderEvolution(evolutionData) {
    const evolutionDiv = document.getElementById('pokemonEvolution');
    const chain = [];
    let current = evolutionData.chain;
    
    while (current) {
        chain.push(current.species.name);
        current = current.evolves_to[0];
    }
    for (const name of chain) {
        const data = await fetchPokemon(name);
        const img = document.createElement('img');
        img.src = data.sprites.front_default;
        img.alt = name;
        evolutionDiv.appendChild(img);
    }
}

document.addEventListener('DOMContentLoaded', loadPokemonDetails);