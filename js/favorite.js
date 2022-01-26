import { showWeatherHandler, showForecast } from './main.js';
import { storageFavoriteCities, getFavoriteCities } from './storage.js';
import { UI, createNode } from './view.js';

const favoriteCities = getFavoriteCities();

function addFavoriteCityHandler() {
  const cityName = this.previousElementSibling.textContent;

  if (favoriteCities.has(cityName) || !cityName) return;

  createFavoriteCityNode(cityName);
  favoriteCities.add(cityName);
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

  favoriteCities.delete(favoriteCity.textContent);
  storageFavoriteCities(favoriteCities);
  favoriteCity.remove();
}

export { favoriteCities, createFavoriteCityNode, addFavoriteCityHandler };