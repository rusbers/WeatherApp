const API = {
  URL: {
    WEATHER: 'https://api.openweathermap.org/data/2.5/weather',
    FORECAST: 'https://api.openweathermap.org/data/2.5/forecast',
  },
  KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
};

function getFetchUrl(api, currentCity) {
  const currentWeatherUrl = `${api}?q=${currentCity}&appid=${API.KEY}&units=metric`;
  const forecastUrl = `${api}?q=${currentCity}&appid=${API.KEY}&units=metric`;

  return (api === API.URL.WEATHER) ? currentWeatherUrl : forecastUrl;
}

export { API, getFetchUrl };