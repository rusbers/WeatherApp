import { UI, fillingNode, showMeteoInfo } from './view.js';
import { storageCurrentCity, storageFavoriteCities, renderFavoriteCities, renderCurrentCity } from './storage.js';

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
    .catch(() => alert("No such city has been found!"))
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
  const FAVORITE_CITY = this.previousElementSibling.textContent;

  fillingNode(FAVORITE_CITY);
  favoriteCities.push(FAVORITE_CITY);
  storageFavoriteCities(favoriteCities);
}

function getCityNameInput() {
  return UI.INPUT.value;
}

export {favoriteCities, meteoDataHandler};