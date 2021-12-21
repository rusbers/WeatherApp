import { favoriteCities, meteoDataHandler } from "./main.js";
import { storageFavoriteCities } from "./storage.js";

const UI_ELEMENTS = {
  TRIGGERS: document.querySelectorAll('.triggers__item'),
  TAB_CONTENT: document.querySelectorAll('.tabs-content__item'),
  FORM: document.querySelector('.form'),
  INPUT: document.querySelector('.form__input'),
  LOCATIONS: document.querySelector('.locations__list'),
  ADD_LOCATIONS_BTN: document.querySelector('.add-favorite'),
  DEGREES_NOW: document.querySelector('.degrees'),
  ICON_NOW: document.querySelector('.weather-icon'),
  CITY_NAME: document.querySelector('.city__name'),
}

function tabsToggler(item) {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('href').replace('#', '');

    UI_ELEMENTS.TRIGGERS.forEach(child => child.classList.remove('triggers__item--active'));
    UI_ELEMENTS.TAB_CONTENT.forEach(child => child.classList.remove('tabs-content__item--active'));
    
    item.classList.add('triggers__item--active');

    document.getElementById(id).classList.add('tabs-content__item--active');
  })
}

UI_ELEMENTS.TRIGGERS.forEach(tabsToggler);

function createLiNode() {
  return document.getElementById('element-li').content.cloneNode(true);
}

function fillingNode(city) {
  const LI = createLiNode();
  const A = LI.querySelector('a');
  const REMOVE_BTN = LI.querySelector('.remove');

  A.textContent = city;
  UI_ELEMENTS.LOCATIONS.append(LI);

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
  UI_ELEMENTS.DEGREES_NOW.textContent = meteoData.DEGREE;
  UI_ELEMENTS.DEGREES_NOW.classList.add('degrees--show');
  UI_ELEMENTS.ICON_NOW.style.backgroundImage = meteoData.ICON_LINK;
  UI_ELEMENTS.CITY_NAME.textContent = meteoData.CITY;
}

export {UI_ELEMENTS, fillingNode, showMeteoInfo};