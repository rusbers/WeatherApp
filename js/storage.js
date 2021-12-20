import { fillingNode } from "./view.js";

function storageCurrentCity(city) {
  localStorage.setItem('current city', city);
}

function storageFavoriteCities(cities) {
  localStorage.setItem('favorite cities', JSON.stringify(cities));
}

function getFavoriteCities() {
  return JSON.parse(localStorage.getItem('favorite cities'));
}

function renderFavoriteCities() {
  const data = getFavoriteCities();

  if (!data) return;

  data.forEach((item) => {
    const CITY = item;
    fillingNode(CITY)
  })
}

export {storageCurrentCity, storageFavoriteCities, renderFavoriteCities};