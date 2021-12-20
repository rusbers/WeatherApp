import { UI_ELEMENTS, fillingNode } from './view.js';
import { storageFavoriteCities, renderFavoriteCities } from './storage.js';

const FAVORITE_CITIES = [];

renderFavoriteCities();

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
    .then(showMeteoNow)
    .catch(() => alert("No such city has been found!"))
    .finally(UI_ELEMENTS.INPUT.form.reset());
}

function showMeteoNow(result) {
  const ICON = result.weather[0].icon;
  const SHOW_DATA = {
    DEGREE: Math.ceil(result.main.temp),
    ICON_LINK: `url(https://openweathermap.org/img/wn/${ICON}@2x.png`,
    CITY: result.name,
  }

  UI_ELEMENTS.DEGREES_NOW.textContent = SHOW_DATA.DEGREE;
  UI_ELEMENTS.DEGREES_NOW.classList.add('degrees--show');
  UI_ELEMENTS.ICON_NOW.style.backgroundImage = SHOW_DATA.ICON_LINK;
  UI_ELEMENTS.CITY_NAME.textContent = SHOW_DATA.CITY;
}

function favoriteHandler() {
  const FAVORITE_CITY = this.previousElementSibling.textContent;
  fillingNode(FAVORITE_CITY);
  FAVORITE_CITIES.push(FAVORITE_CITY);
  storageFavoriteCities(FAVORITE_CITIES);
}

function getCityNameInput() {
  return UI_ELEMENTS.INPUT.value;
}

export {FAVORITE_CITIES, meteoDataHandler};