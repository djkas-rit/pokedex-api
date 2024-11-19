const pokemons = require('../data/pokedex.json');

// Get all Pokémon or filter by query
const getPokemons = (query) => {
  let results = pokemons;

  if (query.name) {
    results = results.filter(
      (pokemon) => pokemon.name.english.toLowerCase().includes(query.name.toLowerCase()),
    );
  }

  return results;
};

// Get Pokémon by ID
const getPokemonById = (id) => pokemons.find((p) => p.id === id) || null;

// Get Pokémon by name
const getPokemonByName = (name) => pokemons.find(
  (p) => p.name.toLowerCase() === name.toLowerCase(),
) || null;

module.exports = {
  getPokemons,
  getPokemonById,
  getPokemonByName,
};
