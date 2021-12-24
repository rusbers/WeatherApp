import { favoriteCities, weatherHandler, forecastHandler } from "./main.js";
import { storageFavoriteCities } from "./storage.js";

const UI = {
  FORM: document.querySelector('.form'),
  INPUT: document.querySelector('.form__input'),
  LOCATIONS: document.querySelector('.locations__list'),
  DEGREES_WEATHER: document.querySelectorAll('.degrees--weather'),
  CITY_NAME: document.querySelectorAll('.city__name'),

  NODES: {
    FAVORITE_TEMPLATE: document.getElementById('element-favorite'),
    FORECAST_TEMPLATE: document.getElementById('element-forecast'),
  },

  TABS: {
    TRIGGERS: document.querySelectorAll('.triggers__item'),
    CONTENT: document.querySelectorAll('.tabs-content__item')
  },

  NOW: {
    ICON: document.querySelector('.weather-icon'),
    ADD_FAVORITE_BTN: document.querySelector('.add-favorite'),
  },

  DETAILS: {
    FEELS_LIKE: document.querySelector('.details-feel'),
    WEATHER: document.querySelector('.detail-weather'),
    SUNRISE: document.querySelector('.detail-sunrise'),
    SUNSET: document.querySelector('.detail-sunset'),
  },

  FORECAST: {
    BTN: document.getElementById('forecast-btn'),
    LIST: document.querySelector('.forecast-list'),
  },
}

function tabsToggler(item) {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('href').replace('#', '');

    UI.TABS.TRIGGERS.forEach(child => child.classList.remove('triggers__item--active'));
    UI.TABS.CONTENT.forEach(child => child.classList.remove('tabs-content__item--active'));
    
    item.classList.add('triggers__item--active');

    document.getElementById(id).classList.add('tabs-content__item--active');
  })
}

UI.TABS.TRIGGERS.forEach(tabsToggler);

function createNode(template) {
  return template.content.cloneNode(true);
}

function fillLiNode(city) {
  const LI = createNode(UI.NODES.FAVORITE_TEMPLATE);
  const A = LI.querySelector('a');
  const REMOVE_BTN = LI.querySelector('.remove');

  A.textContent = city;
  UI.LOCATIONS.append(LI);

  REMOVE_BTN.addEventListener('click', removeLocation);
  A.addEventListener('click', () => weatherHandler(() => city));
  A.addEventListener('click', forecastHandler);
}

function removeLocation() {
  const CITY = this.parentElement;
  const CITY_INDEX = favoriteCities.indexOf(CITY.textContent, 0);

  favoriteCities.splice(CITY_INDEX, 1);
  storageFavoriteCities(favoriteCities);
  CITY.remove();
}

function showWeather(meteoData) {
  UI.DEGREES_WEATHER.forEach((item) => {
    item.textContent = meteoData.DEGREE;
    item.classList.add('degrees--show');
  });
  UI.CITY_NAME.forEach((item) => item.textContent = meteoData.CITY);
  UI.NOW.ICON.style.backgroundImage = meteoData.ICON_LINK;
  UI.DETAILS.FEELS_LIKE.textContent = meteoData.HOW_FEELS;
  UI.DETAILS.WEATHER.textContent = meteoData.WEATHER;
  UI.DETAILS.SUNSET.textContent = meteoData.SUNSET_TIME;
  UI.DETAILS.SUNRISE.textContent = meteoData.SUNRISE_TIME;
}

function fillForecastNode(nodeElements, forecastData) {
  nodeElements.TIME.textContent = forecastData.TIME;
  nodeElements.TEMP.textContent = forecastData.DEGREE;
  nodeElements.FEELS_LIKE.textContent = forecastData.HOW_FEELS;
  nodeElements.WEATHER.textContent = forecastData.WEATHER;
  nodeElements.ICON.style.backgroundImage = forecastData.ICON_LINK;
}

export {UI, fillLiNode, showWeather, createNode, fillForecastNode };