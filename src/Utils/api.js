import { config } from './config';

export const autocompleteApi = (query, number = 10) => `${config.SPOONACULAR_API}/recipes/autocomplete?apiKey=${config.API_KEY}&number=${number}&query=${query}`;

export const randomRecipes = (number = 5) => `${config.SPOONACULAR_API}/recipes/random?apiKey=${config.API_KEY}&number=${number}`;

export const recipeById = id => `${config.SPOONACULAR_API}/recipes/${id}/information?apiKey=${config.API_KEY}`;

export const successfulResponse = response => response && response.data && response.status === 200;
