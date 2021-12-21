import { UI_ELEMENTS, fillingNode, showMeteoInfo } from './view.js';
import { storageCurrentCity, storageFavoriteCities, renderFavoriteCities, renderCurrentCity } from './storage.js';

const favoriteCities = [];

renderFavoriteCities();
renderCurrentCity();

UI_ELEMENTS.FORM.addEventListener('submit', () => meteoDataHandler(getCityNameInput));
UI_ELEMENTS.ADD_LOCATIONS_BTN.addEventListener('click', favoriteHandler);

function meteoDataHandler(getCityName) {
  const API = {
    URL: 'https://api.openweathermap.org/data/2.5/weather',
    KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
  }
  const CITY = getCityName();
  const FETC_URL = `${API.URL}?q=${CITY}&appid=${API.KEY}&units=metric`;

  fetch(FETC_URL)
    .then((response) => response.json())
    .then(renderMeteoInfo)
    .catch(() => alert("No such city has been found!"))
    .finally(UI_ELEMENTS.INPUT.form.reset());
}

function renderMeteoInfo(result) {
  const ICON = result.weather[0].icon;
  const SHOW_DATA = {
    DEGREE: Math.ceil(result.main.temp),
    ICON_LINK: `url(https://openweathermap.org/img/wn/${ICON}@2x.png`,
    CITY: result.name,
  }

  storageCurrentCity(SHOW_DATA);
  showMeteoInfo(SHOW_DATA);
}

function favoriteHandler() {
  const FAVORITE_CITY = this.previousElementSibling.textContent;
  fillingNode(FAVORITE_CITY);
  favoriteCities.push(FAVORITE_CITY);
  storageFavoriteCities(favoriteCities);
}

function getCityNameInput() {
  return UI_ELEMENTS.INPUT.value;
}

export {favoriteCities, meteoDataHandler};