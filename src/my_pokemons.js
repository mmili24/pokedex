document.addEventListener('DOMContentLoaded', () => {
    let pokemons = loadPokemon();
    renderPokemons(pokemons);

    document.getElementById('sortByName').addEventListener('click', () => {
        pokemons = [...pokemons].sort((a, b) => a.nom.localeCompare(b.nom));
        renderPokemons(pokemons);
    });

    document.getElementById('sortByLevel').addEventListener('click', () => {
        pokemons = [...pokemons].sort((a, b) => b.level - a.level);
        renderPokemons(pokemons);
    });

    document.getElementById('sortById').addEventListener('click', () => {
        pokemons = [...pokemons].sort((a, b) => a.id - b.id);
        renderPokemons(pokemons);
    });
});

function renderPokemons(pokemons) {
    const grid = document.getElementById('myPokemonGrid');
    grid.replaceChildren();

    if (pokemons.length === 0) {
        const msg = document.createElement('p');
        msg.className = 'empty-message';
        msg.textContent = 'Encara no tens cap Pokemon capturat. Ves a caçar!';
        grid.appendChild(msg);
        return;
    }

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');

        const img = document.createElement('img');
        img.src = pokemon.sprites;
        img.alt = pokemon.nom;
        card.appendChild(img);

        const nom = document.createElement('p');
        nom.textContent = pokemon.nom.charAt(0).toUpperCase() + pokemon.nom.slice(1);
        card.appendChild(nom);

        const level = document.createElement('p');
        level.textContent = `Nivell ${pokemon.level}`;
        card.appendChild(level);

        grid.appendChild(card);
    });
}