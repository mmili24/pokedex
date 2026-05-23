/**
 * Classe base que representa un Pokémon
 */
class Pokemon {
  #stats;
  #id;

  /**
   * @param {number} id - Identificador del Pokémon
   * @param {string} name - Nom del Pokémon
   * @param {Array<string>} types - Tipus del Pokémon
   * @param {number} height - Alçada del Pokémon
   * @param {number} weight - Pes del Pokémon
   * @param {Array<Object>} stats - Stats del Pokémon
   * @param {Array<string>} abilities - Habilitats del Pokémon
   * @param {string} sprites - URL del sprite del Pokémon
   */
  constructor(id, name, types, height, weight, stats, abilities, sprites) {
    this.#id = id;
    this.nom = name;
    this.tipus = types;
    this.altura = height;
    this.pes = weight;
    this.#stats = stats;
    this.habilitats = abilities;
    this.sprites = sprites;
  }

  /**
   * Retorna els stats del Pokémon
   * @returns {Array<Object>} Els stats del Pokémon
   */
  getStats() {
    return this.#stats;
  }

  /**
   * Retorna l'id del Pokémon
   * @returns {number} L'id del Pokémon
   */
  getId() {
    return this.#id;
  }

  /**
   * Serialitza el Pokémon per guardar-lo al localStorage
   * @returns {Object} Objecte serialitzable
   */
  toJSON() {
    return {
        id: this.getId(),
        nom: this.nom,
        tipus: this.tipus,
        altura: this.altura,
        pes: this.pes,
        stats: this.getStats(),
        habilitats: this.habilitats,
        sprites: this.sprites,
        capturat: this.capturat ?? false,
        level: this.level ?? 1
    };
  }

  /**
   * Crea una instància de Pokemon a partir de les dades de la PokéAPI
   * @param {Object} data - Dades crues de la PokéAPI
   * @returns {Pokemon} Nova instància de Pokemon
   */
  static fromApiData(data) {
    const id = data.id;
    const name = data.name;
    const types = data.types.map(typeInfo => typeInfo.type.name);
    const height = data.height;
    const weight = data.weight;
    const stats = data.stats.map(statInfo => ({
      nom: statInfo.stat.name,
      valor: statInfo.base_stat
    }));
    const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name);
    const sprites = data.sprites.front_default;

    return new Pokemon(id, name, types, height, weight, stats, abilities, sprites);
  }
}

/**
 * Representa un Pokémon salvatge trobat durant la caça
 * @extends Pokemon
 */
class WildPokemon extends Pokemon {

  /**
   * @param {number} id
   * @param {string} name
   * @param {Array<string>} types
   * @param {number} height
   * @param {number} weight
   * @param {Array<Object>} stats
   * @param {Array<string>} abilities
   * @param {string} sprites
   * @param {string|null} location - Lloc on s'ha trobat
   */
  constructor(id, name, types, height, weight, stats, abilities, sprites, location) {
    super(id, name, types, height, weight, stats, abilities, sprites);
    this.capturat = false;
    this.location = location;
  }

  /**
   * Crea una instància de WildPokemon a partir de les dades de la PokéAPI
   * @param {Object} data - Dades crues de la PokéAPI o del sessionStorage
   * @returns {WildPokemon} Nova instància de WildPokemon
   */
  static fromApiData(data) {
    return new WildPokemon(
      data.id,
      data.name,
      data.types.map(t => t.type ? t.type.name : t),
      data.height,
      data.weight,
      data.stats.map(s => s.stat ? { nom: s.stat.name, valor: s.base_stat } : s),
      data.abilities.map(a => a.ability ? a.ability.name : a),
      data.sprites.front_default ?? data.sprites,
      null
    );
  }
}

/**
 * Representa un Pokémon capturat pel jugador
 * @extends Pokemon
 */
class CapturedPokemon extends Pokemon {

  /**
   * @param {number} id
   * @param {string} name
   * @param {Array<string>} types
   * @param {number} height
   * @param {number} weight
   * @param {Array<Object>} stats
   * @param {Array<string>} abilities
   * @param {string} sprites
   * @param {number} level - Nivell del Pokémon (per defecte 1)
   */
  constructor(id, name, types, height, weight, stats, abilities, sprites, level = 1) {
    super(id, name, types, height, weight, stats, abilities, sprites);
    this.capturat = true;
    this.level = level;
  }

  /**
   * Retorna els stats escalats segons el nivell del Pokémon
   * @returns {Array<Object>} Stats multiplicats pel nivell
   */
  getStats() {
    return super.getStats().map(stat => ({
      nom: stat.nom,
      valor: Math.floor(stat.valor * (1 + this.level * 0.1))
    }));
  }
}