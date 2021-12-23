import { fillLiNode, showWeather } from "./view.js";

function storageCurrentCity(currentCityData) {
  localStorage.setItem('current city data', JSON.stringify(currentCityData));
}

function storageFavoriteCities(cities) {
  localStorage.setItem('favorite cities', JSON.stringify(cities));
}

function renderFavoriteCities() {
  const favoriteCitiesData = getFavoriteCities();

  if (!favoriteCitiesData) return;

  favoriteCitiesData.forEach((item) => {
    const CITY = item;
    fillLiNode(CITY)
  })
}

function renderCurrentCity() {
  const SHOW_DATA = getCurrentCityData();
  const isData = (SHOW_DATA !== null);

  if (!isData) return;

  showWeather(SHOW_DATA);
}

function getFavoriteCities() {
  return JSON.parse(localStorage.getItem('favorite cities'));
}

function getCurrentCityData() {
  return JSON.parse(localStorage.getItem('current city data'))
}

export {storageCurrentCity, storageFavoriteCities, renderFavoriteCities, renderCurrentCity, getFavoriteCities };