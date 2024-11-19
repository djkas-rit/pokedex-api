const React = require('react');
const { useState } = React;
const { createRoot } = require('react-dom/client');
import './css/styles.css';

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSearch = async () => {
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`/pokemon?name=${searchTerm}`);
      console.log(response);

      const data = await response.json();


      if (response.ok && data.data.length > 0) {
        setResults(data.data);
      } else {
        setError('No Pokémon found.');
      }
    } catch (err) {
      setError('An error occurred while fetching Pokémon.');
      console.error(err);
    }
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackToSearch = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="container">
      {selectedPokemon ? (
        <PokemonDetails pokemon={selectedPokemon} onBack={handleBackToSearch} />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search for a Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>

          <div className="results-container">
            {error && <p className="error-message">{error}</p>}
            {results.map((pokemon) => (
              <div key={pokemon.id} className="pokemon-card" onClick={() => handlePokemonClick(pokemon)}>
                <img src={pokemon.image.thumbnail} alt={pokemon.name.english} className="pokemon-img" />
                <h2 className="pokemon-name">{pokemon.name.english}</h2>
                <p className="pokemon-type">{pokemon.species}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PokemonDetails({ pokemon, onBack }) {
  return (
    <div className="pokemon-details">
      <button onClick={onBack} className="back-button">Back to Search</button>
      <img src={pokemon.image.hires} alt={pokemon.name.english} className="pokemon-img" />
      <h2 className="pokemon-name">{pokemon.name.english}</h2>
      <h3 className="pokemon-species">{pokemon.species}</h3>
      <p className="pokemon-type">Type: {pokemon.type.join(', ')}</p>
      <p className="pokemon-description">{pokemon.description}</p>
      <div className="pokemon-stats">
        <h4>Base Stats:</h4>
        <p>HP: {pokemon.base.HP}</p>
        <p>Attack: {pokemon.base.Attack}</p>
        <p>Defense: {pokemon.base.Defense}</p>
        <p>Sp. Attack: {pokemon.base["Sp. Attack"]}</p>
        <p>Sp. Defense: {pokemon.base["Sp. Defense"]}</p>
        <p>Speed: {pokemon.base.Speed}</p>
      </div>
      <div className="pokemon-profile">
        <h4>Profile:</h4>
        <p>Height: {pokemon.profile.height}</p>
        <p>Weight: {pokemon.profile.weight}</p>
        <p>Egg Groups: {pokemon.profile.egg.join(', ')}</p>
        <p>Abilities: {pokemon.profile.ability.map(ability => ability[0]).join(', ')}</p>
        <p>Gender Ratio: {pokemon.profile.gender}</p>
      </div>
    </div>
  );
}

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render( <PokemonSearch /> );
};

window.onload = init;