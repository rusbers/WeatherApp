import { createFavoriteCityNode, showWeather } from './view.js'; 
import Cookies from 'js-cookie';

function storageCurrentCity(currentCityData) {
  const oneHour = 1/24;

  return Cookies.set('current city data', JSON.stringify(currentCityData), {expires: oneHour});
}

function storageFavoriteCities(cities) {
  localStorage.setItem('favorite cities', JSON.stringify([...cities]));
}

function renderFavoriteCities() {
  const favoriteCitiesData = Array.from(getFavoriteCities());

  if (!favoriteCitiesData) return;

  const lastFavoriteCityIndex = favoriteCitiesData.length - 1;

  function createRenderingNode(cityIndex) {
    const currentCityName = favoriteCitiesData[cityIndex];

    if (cityIndex < 0) return;

    createRenderingNode(cityIndex - 1);

    createFavoriteCityNode(currentCityName);
  } 

  createRenderingNode(lastFavoriteCityIndex);
}

function renderCurrentCity() {
  const showData = getCurrentCityData(); 

  if (!showData) return;

  showWeather(showData);
}

function getFavoriteCities() {
  const favoriteCitiesList = JSON.parse(localStorage.getItem('favorite cities'));

  return (favoriteCitiesList) ? new Set(favoriteCitiesList) : new Set();
}

function getCurrentCityData() {
  const currentCity = Cookies.get('current city data');

  if (!currentCity) return;

  return JSON.parse(currentCity);
}

function renderWeatherInfo(weatherData) {
  const showData = new WeatherInfo(weatherData);
  storageCurrentCity(showData);
  showWeather(showData);
}

function WeatherInfo(weatherData) {
  this.degree = Math.ceil(weatherData.main.temp);
  this.iconLink = `url(https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  this.city = weatherData.name;
  this.howFeels = Math.ceil(weatherData.main.feels_like);
  this.weather = weatherData.weather[0].main;
  this.sunsetTime = weatherData.sys.sunset;
  this.sunriseTime = weatherData.sys.sunrise;
}

export { storageFavoriteCities, renderFavoriteCities, renderCurrentCity, getFavoriteCities, renderWeatherInfo };