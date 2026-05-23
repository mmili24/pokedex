let pokemonList = [];

async function loadPokemons() {
    try {
        const list = await fetchPokemonList();
        const pokemons = await Promise.all(
        list.map(p => fetchPokemon(p.name)));
        pokemonList = pokemons;
        renderPokemons(pokemons);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
    }
}


function renderPokemons(pokemons) {
    const grid = document.getElementById('mainPkmGrid');
    grid.replaceChildren();
    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        const nom = document.createElement('p');
        nom.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        card.appendChild(nom);
        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        card.appendChild(img);
        grid.appendChild(card);
        card.addEventListener('click', () => {
            window.location.href = `details.html?id=${pokemon.id}`;
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadPokemons();
    document.getElementById('pkmSearchInput').addEventListener('input', (event) => {
        const idOrName = event.target.value.toLowerCase();
        const filteredPokemons = pokemonList.filter(pokemon => 
            pokemon.name.toLowerCase().includes(idOrName) || 
            pokemon.id.toString() === idOrName
        );
        renderPokemons(filteredPokemons);
    });
});