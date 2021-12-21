import { fillingNode, showMeteoInfo } from "./view.js";

function storageCurrentCity(data) {
  localStorage.setItem('current city data', JSON.stringify(data));
}

function storageFavoriteCities(cities) {
  localStorage.setItem('favorite cities', JSON.stringify(cities));
}

function getFavoriteCities() {
  return JSON.parse(localStorage.getItem('favorite cities'));
}

function getCurrentCityData() {
  return JSON.parse(localStorage.getItem('current city data'))
}

function renderFavoriteCities() {
  const data = getFavoriteCities();

  if (!data) return;

  data.forEach((item) => {
    const CITY = item;
    fillingNode(CITY)
  })
}

function renderCurrentCity() {
  const SHOW_DATA = getCurrentCityData();
  const isDataEmpty = (SHOW_DATA === null);

  if (isDataEmpty) return;

  showMeteoInfo(SHOW_DATA);
}

export {storageCurrentCity, storageFavoriteCities, renderFavoriteCities, renderCurrentCity };