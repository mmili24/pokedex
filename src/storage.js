/**
 * Carrega la llista de Pokémon capturats del localStorage
 * @returns {Array<CapturedPokemon>} Llista de Pokémon capturats
 */
function loadPokemon() {
    const pkmnData = JSON.parse(localStorage.getItem('Pokemon')) ?? [];
    return pkmnData.map(data => new CapturedPokemon(
        data.id,
        data.nom,
        data.tipus,
        data.altura,
        data.pes,
        data.stats,
        data.habilitats,
        data.sprites,
        data.level
    ));
}

/**
 * Guarda un Pokémon capturat al localStorage
 * @param {Pokemon} pokemon - El Pokémon a guardar
 */
function savePokemon(pokemon) {
    const pkmnList = loadPokemon();
    pkmnList.push(pokemon);
    const pkmnData = JSON.stringify(pkmnList);
    localStorage.setItem('Pokemon', pkmnData);
}

/**
 * Guarda el Pokémon salvatge al sessionStorage per transferir-lo a la batalla
 * @param {WildPokemon} pokemon - El Pokémon salvatge a guardar
 */
function saveWildPokemon(pokemon) {
    const wPkmData = JSON.stringify(pokemon);
    sessionStorage.setItem('Wild Pokemon', wPkmData);
}

/**
 * Carrega el Pokémon salvatge del sessionStorage
 * @returns {Object|null} Les dades del Pokémon salvatge o null si no n'hi ha
 */
function loadWildPokemon() {
    const wPkmnData = JSON.parse(sessionStorage.getItem('Wild Pokemon'));
    return wPkmnData;
}

/**
 * Inicialitza el localStorage amb un Pikachu per defecte si està buit
 */
function initStorage() {
    if (!localStorage.getItem('Pokemon')) {
        fetch('https://pokeapi.co/api/v2/pokemon/25')
            .then(r => r.json())
            .then(data => {
                localStorage.setItem('Pokemon', JSON.stringify([{
                    id: data.id,
                    nom: data.name,
                    tipus: data.types.map(t => t.type.name),
                    altura: data.height,
                    pes: data.weight,
                    stats: data.stats.map(s => ({ nom: s.stat.name, valor: s.base_stat })),
                    habilitats: data.abilities.map(a => a.ability.name),
                    sprites: data.sprites.front_default,
                    capturat: true,
                    level: 2
                }]));
            });
    }
}

initStorage();