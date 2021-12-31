import { showWeatherHandler, showForecast } from './main.js';
import { storageFavoriteCities, getFavoriteCities } from './storage.js';
import { UI, createNode } from './view.js';

const favoriteCities = [];

function addFavoriteCityHandler() {
  const cityName = this.previousElementSibling.textContent;

  if (isCityFavorite(cityName) || !cityName) return;

  createFavoriteCityNode(cityName);
  favoriteCities.push(cityName);
  storageFavoriteCities(favoriteCities);
}

function createFavoriteCityNode(cityName) {
  const favoriteNode = createNode(UI.NODES.FAVORITE_TEMPLATE);
  const favoriteNodeLink = favoriteNode.querySelector('a');
  const removeBtn = favoriteNode.querySelector('.remove');

  favoriteNodeLink.textContent = cityName;
  UI.FAVORITE_LIST.append(favoriteNode);

  removeBtn.addEventListener('click', removeFavoriteCity);
  favoriteNodeLink.addEventListener('click', showWeatherHandler);
  favoriteNodeLink.addEventListener('click', showForecast);
}

function removeFavoriteCity() {
  const favoriteCity = this.parentElement;
  const favoriteCityIndex = favoriteCities.indexOf(favoriteCity.textContent, 0);

  favoriteCities.splice(favoriteCityIndex, 1); // FILTER?
  storageFavoriteCities(favoriteCities);
  favoriteCity.remove();
}

function isCityFavorite(city) {
  const favoriteCities = getFavoriteCities();

  if (!favoriteCities) return;

  return favoriteCities.includes(city);
}

export { favoriteCities, createFavoriteCityNode, addFavoriteCityHandler }