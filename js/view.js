import { createFavoriteCityNode } from "./favorite.js";

const UI = {
  FORM: document.querySelector('.form'),
  INPUT: document.querySelector('.form__input'),
  FAVORITE_LIST: document.querySelector('.locations__list'),
  DEGREES_WEATHER: document.querySelectorAll('.degrees--weather'),
  CITY_NAME: document.querySelectorAll('.city__name'),
  CURRENT_CITY_NAME: document.querySelector('.city__name'),

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

function tabsToggler(currentTab) {
  currentTab.addEventListener('click', event => {
    event.preventDefault();
    const id = event.target.getAttribute('href').replace('#', '');

    UI.TABS.TRIGGERS.forEach(tab => tab.classList.remove('triggers__item--active'));
    UI.TABS.CONTENT.forEach(tab => tab.classList.remove('tabs-content__item--active'));

    currentTab.classList.add('triggers__item--active');

    document.getElementById(id).classList.add('tabs-content__item--active');
  })
}

UI.TABS.TRIGGERS.forEach(tabsToggler);

function createNode(template) {
  return template.content.cloneNode(true);
}

function showWeather(weatherData) {
  UI.DEGREES_WEATHER.forEach((item) => {
    item.textContent = weatherData.DEGREE;
    item.classList.add('degrees--show');
  });
  UI.CITY_NAME.forEach((item) => item.textContent = weatherData.CITY);
  UI.NOW.ICON.style.backgroundImage = weatherData.ICON_LINK;
  UI.DETAILS.FEELS_LIKE.textContent = weatherData.HOW_FEELS;
  UI.DETAILS.WEATHER.textContent = weatherData.WEATHER;
  UI.DETAILS.SUNSET.textContent = weatherData.SUNSET_TIME;
  UI.DETAILS.SUNRISE.textContent = weatherData.SUNRISE_TIME;
}

function showError() {
  const defaultPlaceholderText = 'City';
  const errorPlaceholderText = 'This city was not found in the database';

  UI.INPUT.classList.add('error');
  UI.INPUT.placeholder = errorPlaceholderText;

  setTimeout(function () {
    UI.INPUT.placeholder = defaultPlaceholderText;
    UI.INPUT.classList.remove('error');
  }, 2000);
}

export { UI, createNode, createFavoriteCityNode, showWeather, showError }