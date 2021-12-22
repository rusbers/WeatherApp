import { UI, fillingNode, showMeteoInfo } from './view.js';
import { storageCurrentCity, storageFavoriteCities, renderFavoriteCities, renderCurrentCity, getFavoriteCities } from './storage.js';

const favoriteCities = [];

renderFavoriteCities();
renderCurrentCity();

UI.FORM.addEventListener('submit', () => meteoDataHandler(getCityNameInput));
UI.NOW.ADD_FAVORITE_BTN.addEventListener('click', favoriteHandler);

function meteoDataHandler(getCityName) {
  const API = {
    URL: 'https://api.openweathermap.org/data/2.5/weather',
    KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
  }
  const CITY = getCityName();
  const FETCH_URL = `${API.URL}?q=${CITY}&appid=${API.KEY}&units=metric`;

  fetch(FETCH_URL)
    .then((response) => response.json())
    .then(renderMeteoInfo)
    .catch(showError)
    .finally(UI.INPUT.form.reset());
}

function renderMeteoInfo(result) {
  const ICON = result.weather[0].icon;

  const SHOW_DATA = {
    DEGREE: Math.ceil(result.main.temp),
    ICON_LINK: `url(https://openweathermap.org/img/wn/${ICON}@2x.png`,
    CITY: result.name,
    HOW_FEELS: Math.ceil(result.main.feels_like),
    WEATHER: result.weather[0].main,
    SUNSET_TIME: result.sys.sunset,
    SUNRISE_TIME: result.sys.sunrise,
  }

  storageCurrentCity(SHOW_DATA);
  showMeteoInfo(SHOW_DATA);
}

function favoriteHandler() {
  const CURRENT_CITY = this.previousElementSibling.textContent;

  if (isFavorite(CURRENT_CITY)) return;

  fillingNode(CURRENT_CITY);
  favoriteCities.push(CURRENT_CITY);
  storageFavoriteCities(favoriteCities);
}

function getCityNameInput() {
  return UI.INPUT.value;
}

function isFavorite(city) {
  const favoriteCities = getFavoriteCities();

  if (!favoriteCities) return;

  return favoriteCities.includes(city);
}

function showError() {
  const PLACEHOLDER_TEXT = UI.INPUT.placeholder;
  const PLACEHOLDER_ERROR = 'This city was not found in the database';
  
  UI.INPUT.classList.add('error');
  UI.INPUT.placeholder = PLACEHOLDER_ERROR;

  setTimeout(function() {
    UI.INPUT.placeholder = PLACEHOLDER_TEXT;
    UI.INPUT.classList.remove('error');
  }, 2000);
}

export {favoriteCities, meteoDataHandler};