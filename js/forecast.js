import { UI, createNode } from './view.js';
import { getHour, getDayMonth } from './date.js';

function renderForecast(forecastData) {
  const forecastDays = forecastData.list;

  UI.FORECAST.LIST.innerHTML = '';

  forecastDays.forEach((forecastDay) => {
    const forecastData = new ForecastData(forecastDay);
    const forecastNode = createNode(UI.NODES.FORECAST_TEMPLATE);
    const forecastNodeElements = new ForecastNodeElements(forecastNode);

    fillForecastNode(forecastNodeElements, forecastData);
    UI.FORECAST.LIST.append(forecastNode);
  })
}

function ForecastData(forecastDay) {
  this.time = forecastDay.dt;
  this.temperature = Math.ceil(forecastDay.main.temp);
  this.feelsLike = Math.ceil(forecastDay.main.feels_like);
  this.icon = `url(https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png)`;
  this.weather = forecastDay.weather[0].main;
}

function ForecastNodeElements(forecastNode) {
  this.time = forecastNode.querySelector('.forecast-time__date');
  this.hour = forecastNode.querySelector('.forecast-time__hour');
  this.temperature = forecastNode.querySelector('.forecast-weather__temperature');
  this.feelsLike = forecastNode.querySelector('.forecast-weather__feels-like');
  this.icon = forecastNode.querySelector('.forecast-status__icon');
  this.weather = forecastNode.querySelector('.forecast-status__name');
}

function fillForecastNode(nodeElements, forecastData) {
  nodeElements.time.textContent = getDayMonth(forecastData.time);
  nodeElements.hour.textContent = getHour(forecastData.time);
  nodeElements.temperature.textContent = forecastData.temperature;
  nodeElements.feelsLike.textContent = forecastData.feelsLike;
  nodeElements.weather.textContent = forecastData.weather;
  nodeElements.icon.style.backgroundImage = forecastData.icon;
}

export { renderForecast };