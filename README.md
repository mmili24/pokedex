# PokéDex Web

Aplicació web multi-pàgina amb consum de l'API REST de PokéAPI, manipulació del DOM, OOP i sistema de batalla.

## Tecnologies

- JavaScript vanilla
- Vite
- PokéAPI (https://pokeapi.co)

## Com executar el projecte

```bash
npm install
npm run dev
```

Obre el navegador a `http://localhost:5173`

## Funcionalitats implementades

### index.html — Cercador
- Carrega i mostra els primers 151 Pokémon en graella
- Cerca en temps real per nom o número
- Cada targeta navega a la pàgina de detall

### details.html — Detall
- Carrega el Pokémon des del paràmetre URL `?id=25`
- Mostra stats, moviments i cadena evolutiva

### hunt.html — Caça
- Clic al mapa genera un Pokémon salvatge aleatori
- Mostra silueta fosca fins que es revela
- Botó "Lluitar" navega a battle.html via sessionStorage

### my_pokemons.html — Col·lecció
- Mostra Pokémon capturats persistits al localStorage
- Ordenació per nom, nivell i número

### battle.html — Batalla
- Combat per torns amb lògica de dany basada en stats
- Barres de HP animades i log de combat
- En victòria guarda el Pokémon al localStorage

## Estructura del projecte

```
src/
├── assets/
│   ├── hunt_bg.png
│   └── battle_bg.png
├── api.js          # Crides a la PokéAPI
├── pokemon.js      # Classes Pokemon, WildPokemon, CapturedPokemon
├── storage.js      # Gestió de localStorage i sessionStorage
├── index.js        # Lògica del cercador
├── details.js      # Lògica del detall
├── hunt.js         # Lògica de la caça
├── my_pokemons.js  # Lògica de la col·lecció
└── battle.js       # Lògica de la batalla
css/
├── styles.css      # Estils globals
├── index.css
├── details.css
├── hunt.css
├── my_pokemons.css
└── battle.css
```
