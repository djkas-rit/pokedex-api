const pokemonModel = require('../models/pokemonModel');

// Get all Pokémon or filter by name query
const getPokemon = (req, res) => {
  const { query } = req;
  const filteredPokemons = pokemonModel.getPokemons(query);

  res.json({
    success: true,
    message: 'Pokémon fetched successfully.',
    data: filteredPokemons,
  });
};

// Get Pokémon by ID
const getPokemonById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pokemon = pokemonModel.getPokemonById(id);

  if (pokemon) {
    res.json({
      success: true,
      message: 'Pokémon fetched successfully.',
      data: pokemon,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `No Pokémon found with ID ${id}.`,
    });
  }
};

// Get Pokémon by name
const getPokemonByName = (req, res) => {
  const { name } = req.params;
  const pokemon = pokemonModel.getPokemonByName(name);

  if (pokemon) {
    res.json({
      success: true,
      message: 'Pokémon fetched successfully.',
      data: pokemon,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `No Pokémon found with name "${name}".`,
    });
  }
};

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
};
