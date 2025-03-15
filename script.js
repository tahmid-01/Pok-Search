const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

// API endpoint
const API_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

// Function to update stat bars
const updateStatBars = (stat, value) => {
    const maxStat = 255; // Maximum possible stat value
    const percentage = (value / maxStat) * 100;
    const statFill = document.querySelector(`[data-stat="${stat}"]`);
    statFill.style.width = `${percentage}%`;
};

// Function to create type element
const createTypeElement = (type) => {
    const typeElement = document.createElement('span');
    typeElement.textContent = type;
    typeElement.classList.add('type', type.toUpperCase());
    return typeElement;
};

// Function to display Pokemon data
const displayPokemonData = (pokemon) => {
    // Update text content
    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonId.textContent = `#${pokemon.id}`;
    weight.textContent = `Weight: ${pokemon.weight}`;
    height.textContent = `Height: ${pokemon.height}`;
    hp.textContent = pokemon.stats[0].base_stat;
    attack.textContent = pokemon.stats[1].base_stat;
    defense.textContent = pokemon.stats[2].base_stat;
    specialAttack.textContent = pokemon.stats[3].base_stat;
    specialDefense.textContent = pokemon.stats[4].base_stat;
    speed.textContent = pokemon.stats[5].base_stat;

    // Update stat bars
    updateStatBars('hp', pokemon.stats[0].base_stat);
    updateStatBars('attack', pokemon.stats[1].base_stat);
    updateStatBars('defense', pokemon.stats[2].base_stat);
    updateStatBars('special-attack', pokemon.stats[3].base_stat);
    updateStatBars('special-defense', pokemon.stats[4].base_stat);
    updateStatBars('speed', pokemon.stats[5].base_stat);

    // Clear and update types
    types.innerHTML = '';
    pokemon.types.forEach(type => {
        types.appendChild(createTypeElement(type.type.name));
    });

    // Update sprite
    const existingSprite = document.getElementById('sprite');
    if (existingSprite) {
        existingSprite.remove();
    }
    
    const sprite = document.createElement('img');
    sprite.id = 'sprite';
    sprite.src = pokemon.sprites.front_default;
    sprite.alt = pokemon.name;
    document.querySelector('.pokemon-image').appendChild(sprite);
};

// Function to search Pokemon
const searchPokemon = async () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        alert('Please enter a Pokemon name or ID');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${searchTerm}`);
        
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        const data = await response.json();
        displayPokemonData(data);
    } catch (error) {
        alert('Pokémon not found');
    }
};

// Event listeners
searchButton.addEventListener('click', searchPokemon);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
}); 