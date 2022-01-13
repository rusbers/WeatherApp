import { createFavoriteCityNode, showWeather } from './view.js'; 

function storageCurrentCity(currentCityData) {
  localStorage.setItem('current city data', JSON.stringify(currentCityData));
}

function storageFavoriteCities(cities) {
  localStorage.setItem('favorite cities', JSON.stringify([...cities]));
}

function renderFavoriteCities() {
  const favoriteCitiesData = getFavoriteCities();

  if (!favoriteCitiesData) return;

  favoriteCitiesData.forEach((item) => {
    const city = item;
    createFavoriteCityNode(city)
  })
}

function renderCurrentCity() {
  const showData = getCurrentCityData();
  const isData = (showData !== null);

  if (!isData) return;

  showWeather(showData);
}

function getFavoriteCities() {
  return JSON.parse(localStorage.getItem('favorite cities'));
}

function getCurrentCityData() {
  return JSON.parse(localStorage.getItem('current city data'))
}

function renderWeatherInfo(weatherData) {
  const showData = new WeatherInfo(weatherData)
  storageCurrentCity(showData);
  showWeather(showData);
}

function WeatherInfo(weatherData) {
  this.DEGREE = Math.ceil(weatherData.main.temp);
  this.ICON_LINK = `url(https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  this.CITY = weatherData.name;
  this.HOW_FEELS = Math.ceil(weatherData.main.feels_like);
  this.WEATHER = weatherData.weather[0].main;
  this.SUNSET_TIME = weatherData.sys.sunset;
  this.SUNRISE_TIME = weatherData.sys.sunrise;
}

export { storageCurrentCity, storageFavoriteCities, renderFavoriteCities, renderCurrentCity, getFavoriteCities, renderWeatherInfo }