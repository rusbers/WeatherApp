import { API, getFetchUrl } from './api.js';
import { UI, showError } from './view.js';
import { renderFavoriteCities, renderCurrentCity, renderWeatherInfo } from './storage.js';
import { renderForecast } from './forecast.js';
import { favoriteCities, addFavoriteCityHandler } from './favorite.js';
import { getCityName } from './helper.js';

renderFavoriteCities();
renderCurrentCity();

UI.FORM.addEventListener('submit', showWeatherHandler);
UI.NOW.ADD_FAVORITE_BTN.addEventListener('click', addFavoriteCityHandler);

async function showWeatherHandler() {
  const currentCity = getCityName(this);
  const fetchUrl = getFetchUrl(API.URL.WEATHER, currentCity);

  try {
    const fetchWeatherData = await fetch(fetchUrl);
    const weatherData = await fetchWeatherData.json();
    renderWeatherInfo(weatherData);
  } catch {
    showError();
  } finally {
    UI.INPUT.form.reset();
  }

  showForecast();
}

async function showForecast() {
  const currentCity = UI.CURRENT_CITY_NAME.textContent;
  const fetchUrl = getFetchUrl(API.URL.FORECAST, currentCity);

  const fetchForecastData = await fetch(fetchUrl);
  const forecastData = await fetchForecastData.json();
  renderForecast(forecastData);
}

export { showWeatherHandler, showForecast, favoriteCities };