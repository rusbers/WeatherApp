import { favoriteCities, meteoDataHandler } from "./main.js";
import { storageFavoriteCities } from "./storage.js";

const UI = {
  FORM: document.querySelector('.form'),
  INPUT: document.querySelector('.form__input'),
  LOCATIONS: document.querySelector('.locations__list'),
  DEGREES: document.querySelectorAll('.degrees'),
  CITY_NAME: document.querySelectorAll('.city__name'),

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
  }
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

function createLiNode() {
  return document.getElementById('element-li').content.cloneNode(true);
}

function fillingNode(city) {
  const LI = createLiNode();
  const A = LI.querySelector('a');
  const REMOVE_BTN = LI.querySelector('.remove');

  A.textContent = city;
  UI.LOCATIONS.append(LI);

  REMOVE_BTN.addEventListener('click', removeLocation);
  A.addEventListener('click', () => meteoDataHandler(() => city));
}

function removeLocation() {
  const CITY = this.parentElement;
  const CITY_INDEX = favoriteCities.indexOf(CITY.textContent, 0);

  favoriteCities.splice(CITY_INDEX, 1);
  storageFavoriteCities(favoriteCities);
  CITY.remove();
}

function showMeteoInfo(meteoData) {
  UI.DEGREES.forEach((item) => item.textContent = meteoData.DEGREE);
  UI.DEGREES.forEach((item) => item.classList.add('degrees--show'));
  UI.CITY_NAME.forEach((item) => item.textContent = meteoData.CITY);
  UI.NOW.ICON.style.backgroundImage = meteoData.ICON_LINK;
  UI.DETAILS.FEELS_LIKE.textContent = meteoData.HOW_FEELS;
  UI.DETAILS.WEATHER.textContent = meteoData.WEATHER;
  UI.DETAILS.SUNSET.textContent = meteoData.SUNSET_TIME;
  UI.DETAILS.SUNRISE.textContent = meteoData.SUNRISE_TIME;
}

export {UI, fillingNode, showMeteoInfo };