import axios from "axios";

import { Pokemon } from "./types";

axios.defaults.baseURL = "https://pokeapi.co/api/v2";

const getPokemons = async (page: number): Promise<Pokemon[]> => {
  const response = await axios.get(`pokemon?limit=10&offset=${(page - 1) * 10}`);
  return response.data.results;
};

export default getPokemons;
