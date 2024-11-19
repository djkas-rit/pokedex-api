// import the controller folder (automatically calls the index.js file)
const controllers = require('./controllers');
const pokemonController = require('./controllers/pokemonController');

const router = (app) => {
  // view routes
  app.get('/example1', controllers.example1);
  app.get('/', controllers.example1);

  // api routes
  app.get('/pokemon', pokemonController.getPokemon); // Filter or get all Pokémon
  app.get('/pokemon/:id', pokemonController.getPokemonById); // Get Pokémon by ID
  app.get('/name/:name', pokemonController.getPokemonByName); // Get Pokémon by name
};

module.exports = router;
