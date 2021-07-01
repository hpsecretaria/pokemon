import React, { useCallback, useEffect, useState } from "react";

import getPokemons from "./api";
import { Pokemon } from "./types";

import "./App.css";

function App(): React.ReactElement {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const getPokemonsCb = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getPokemons(page);
      console.log(result);
      setPokemons(result);
      setLoading(false);
    } catch (error) {
      setPokemons([]);
      setLoading(true);
    }
  }, [page]);

  useEffect(() => {
    getPokemonsCb();
  }, [getPokemonsCb]);

  return (
    <div className="App">
      {loading ? (
        <h1>Loading data...</h1>
      ) : (
        <>
          <h1>{`Current Page: ${page}`}</h1>
          <ul>
            {pokemons.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
          <div className="btn-container">
            <button
              disabled={page <= 1}
              type="button"
              onClick={() => setPage(page - 1)}
            >
              Previous Page
            </button>
            <button type="button" onClick={() => setPage(page + 1)}>
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
