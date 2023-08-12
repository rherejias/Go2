import apiClient from "./apiClient";

export const getPokemon = (pokemon: string) => {
  return apiClient.get(`pokemon/${pokemon}`);
};

export const getAllPokemon = () => {
  return apiClient.get(`pokemon?limit=1281`);
};