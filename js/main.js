import { UI, fillLiNode, showWeather, fillForecastNode, createNode } from './view.js';
import { storageCurrentCity, storageFavoriteCities, renderFavoriteCities, renderCurrentCity, getFavoriteCities } from './storage.js';

const favoriteCities = [];

const API = {
  URL: {
    WEATHER: 'https://api.openweathermap.org/data/2.5/weather',
    FORECAST: 'https://api.openweathermap.org/data/2.5/forecast',
  },
  KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
}

renderFavoriteCities();
renderCurrentCity();

UI.FORM.addEventListener('submit', () => weatherHandler(getCityNameInput));
UI.NOW.ADD_FAVORITE_BTN.addEventListener('click', favoriteHandler);

function weatherHandler(getCityName) {
  const CITY = getCityName();
  const FETCH_URL = `${API.URL.WEATHER}?q=${CITY}&appid=${API.KEY}&units=metric`;

  fetch(FETCH_URL)
    .then((response) => response.json())
    .then(renderMeteoInfo)
    .catch(showError)
    .finally(UI.INPUT.form.reset());
}

function renderMeteoInfo(result) {
  const SHOW_DATA = {
    DEGREE: Math.ceil(result.main.temp),
    ICON_LINK: `url(https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,
    CITY: result.name,
    HOW_FEELS: Math.ceil(result.main.feels_like),
    WEATHER: result.weather[0].main,
    SUNSET_TIME: result.sys.sunset,
    SUNRISE_TIME: result.sys.sunrise,
  }

  storageCurrentCity(SHOW_DATA);
  showWeather(SHOW_DATA);
}

function favoriteHandler() {
  const CURRENT_CITY = this.previousElementSibling.textContent;

  if (isFavorite(CURRENT_CITY)) return;

  fillLiNode(CURRENT_CITY);
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
  const PLACEHOLDER_TEXT = 'City';
  const PLACEHOLDER_ERROR = 'This city was not found in the database';
  
  UI.INPUT.classList.add('error');
  UI.INPUT.placeholder = PLACEHOLDER_ERROR;

  setTimeout(function() {
    UI.INPUT.placeholder = PLACEHOLDER_TEXT;
    UI.INPUT.classList.remove('error');
  }, 2000);
}

UI.FORECAST.BTN.addEventListener('click', forecastHandler);

function forecastHandler() {
  const CITY = document.querySelector('.forecast-city').textContent;
  const FETCH_URL = `${API.URL.FORECAST}?q=${CITY}&appid=${API.KEY}&units=metric`;

  fetch(FETCH_URL)
    .then(response => response.json())
    .then(renderForecast);
  // console.log(CITY)
}

function renderForecast(result) {
  const FORECAST_ITEMS = result.list;

  FORECAST_ITEMS.forEach((item) => {
    const FORECAST_DATA = {
      TIME: item.dt,
      DEGREE: Math.ceil(item.main.temp),
      ICON_LINK: `url(https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png)`,
      HOW_FEELS: Math.ceil(item.main.feels_like),
      WEATHER: item.weather[0].main,
    }

    const NODE = createNode(UI.NODES.FORECAST_TEMPLATE);
    const NODE_ELEMENTS = {
      TIME: NODE.querySelector('.forecast-time__date'),
      TEMP: NODE.querySelector('.forecast-weather__temperature'),
      FEELS_LIKE: NODE.querySelector('.forecast-weather__feels-like'),
      WEATHER: NODE.querySelector('.forecast-status__name'),
      ICON: NODE.querySelector('.forecast-status__icon'),
    }

    fillForecastNode(NODE_ELEMENTS, FORECAST_DATA);

    UI.FORECAST.LIST.append(NODE);
  })
}

export {favoriteCities, weatherHandler};