import { UI, createNode } from './view.js';

function renderForecast(forecastData) {
  const forecastDays = forecastData.list;

  UI.FORECAST.LIST.innerHTML = '';

  forecastDays.forEach((forecastDay) => {
    const forecastData = getForecastData(forecastDay);
    const forecastNode = createNode(UI.NODES.FORECAST_TEMPLATE);
    const forecastNodeElements = getForecastNodeElements(forecastNode);

    fillForecastNode(forecastNodeElements, forecastData);
    UI.FORECAST.LIST.append(forecastNode);
  })
}

function getForecastData(forecastDay) {
  return {
    time: forecastDay.dt,
    temperature: Math.ceil(forecastDay.main.temp),
    feelsLike: Math.ceil(forecastDay.main.feels_like),
    icon: `url(https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png)`,
    weather: forecastDay.weather[0].main,
  }
}

function getForecastNodeElements(forecastNode) {
  return {
    time: forecastNode.querySelector('.forecast-time__date'),
    temperature: forecastNode.querySelector('.forecast-weather__temperature'),
    feelsLike: forecastNode.querySelector('.forecast-weather__feels-like'),
    icon: forecastNode.querySelector('.forecast-status__icon'),
    weather: forecastNode.querySelector('.forecast-status__name'),
  }
}

function fillForecastNode(nodeElements, forecastData) {
  nodeElements.time.textContent = forecastData.time;
  nodeElements.temperature.textContent = forecastData.temperature;
  nodeElements.feelsLike.textContent = forecastData.feelsLike;
  nodeElements.weather.textContent = forecastData.weather;
  nodeElements.icon.style.backgroundImage = forecastData.icon;
}

export { renderForecast };