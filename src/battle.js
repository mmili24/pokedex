class Battle {
    #playerHp;
    #enemyHp;
    #playerMaxHp;
    #enemyMaxHp;

    constructor(playerPokemon, enemyPokemon) {
        this.playerPokemon = playerPokemon;
        this.enemyPokemon = enemyPokemon;

        const playerHpStat = playerPokemon.getStats().find(s => s.nom === 'hp');
        const enemyHpStat = enemyPokemon.getStats().find(s => s.nom === 'hp');

        this.#playerMaxHp = playerHpStat ? playerHpStat.valor : 100;
        this.#enemyMaxHp = enemyHpStat ? enemyHpStat.valor : 100;
        this.#playerHp = this.#playerMaxHp;
        this.#enemyHp = this.#enemyMaxHp;
    }

    static calculateDamage(attacker, isPlayer = false) {
        const attackStat = attacker.getStats().find(s => s.nom === 'attack');
        const base = attackStat ? attackStat.valor : 50;
        const multiplier = isPlayer ? 1.5 : 0.8;
        return Math.floor(base * multiplier * (0.8 + Math.random() * 0.4));
    }

    playerTurn() {
        const damage = Battle.calculateDamage(this.playerPokemon, true);
        this.#enemyHp = Math.max(0, this.#enemyHp - damage);
        return { damage, enemyHp: this.#enemyHp, enemyMaxHp: this.#enemyMaxHp };
    }

    enemyTurn() {
        const damage = Battle.calculateDamage(this.enemyPokemon, false);
        this.#playerHp = Math.max(0, this.#playerHp - damage);
        return { damage, playerHp: this.#playerHp, playerMaxHp: this.#playerMaxHp };
    }

    isPlayerDead() { return this.#playerHp <= 0; }
    isEnemyDead() { return this.#enemyHp <= 0; }

    getPlayerHpPercent() { return (this.#playerHp / this.#playerMaxHp) * 100; }
    getEnemyHpPercent() { return (this.#enemyHp / this.#enemyMaxHp) * 100; }
}

let battle = null;

async function init() {
    try {
        const wildData = loadWildPokemon();
        if (!wildData) {
            window.location.href = 'hunt.html';
            return;
        }

        const myPokemons = loadPokemon();

        const playerPokemon = myPokemons.length > 0
            ? myPokemons[0]
            : WildPokemon.fromApiData(await fetchPokemon(25));

        const enemyPokemon = new WildPokemon(
            wildData.id,
            wildData.nom,
            wildData.tipus,
            wildData.altura,
            wildData.pes,
            wildData.stats,
            wildData.habilitats,
            wildData.sprites
        );

        battle = new Battle(playerPokemon, enemyPokemon);

        document.getElementById('playerName').textContent = playerPokemon.nom;
        document.getElementById('playerSprite').src = playerPokemon.sprites;
        document.getElementById('enemyName').textContent = wildData.nom;
        document.getElementById('enemySprite').src = wildData.sprites;

        updateHpBars();

        document.getElementById('attackBtn').addEventListener('click', playerAttack);
        document.getElementById('fleeBtn').addEventListener('click', () => {
            window.location.href = 'hunt.html';
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

function playerAttack() {
    if (!battle) return;

    document.getElementById('attackBtn').disabled = true;

    const playerResult = battle.playerTurn();
    updateHpBars();
    document.getElementById('battleLog').textContent =
        `${document.getElementById('playerName').textContent} ataca i fa ${playerResult.damage} de dany!`;

    if (battle.isEnemyDead()) {
        showResult(true);
        return;
    }

    setTimeout(() => {
        const enemyResult = battle.enemyTurn();
        updateHpBars();
        document.getElementById('battleLog').textContent =
            `${document.getElementById('enemyName').textContent} contraataca i fa ${enemyResult.damage} de dany!`;

        if (battle.isPlayerDead()) {
            showResult(false);
            return;
        }

        document.getElementById('attackBtn').disabled = false;
    }, 1000);
}

function updateHpBars() {
    const playerBar = document.getElementById('playerHpBar');
    const enemyBar = document.getElementById('enemyHpBar');

    const playerPercent = battle.getPlayerHpPercent();
    const enemyPercent = battle.getEnemyHpPercent();

    playerBar.style.width = `${playerPercent}%`;
    enemyBar.style.width = `${enemyPercent}%`;

    playerBar.style.background = playerPercent > 50 ? '#4caf50' : playerPercent > 20 ? '#ff9800' : '#f44336';
    enemyBar.style.background = enemyPercent > 50 ? '#4caf50' : enemyPercent > 20 ? '#ff9800' : '#f44336';
}

function showResult(playerWon) {
    document.getElementById('attackBtn').disabled = true;

    const result = document.createElement('div');
    result.className = 'battle-result show';

    const msg = document.createElement('p');
    msg.textContent = playerWon ? 'Has guanyat!' : 'Has perdut!';
    result.appendChild(msg);

    const btn = document.createElement('button');
    btn.textContent = 'Tornar a caçar';
    btn.addEventListener('click', () => window.location.href = 'hunt.html');
    result.appendChild(btn);

    if (playerWon) {
        savePokemon(battle.enemyPokemon);
    }

    document.body.appendChild(result);
}

document.addEventListener('DOMContentLoaded', init);