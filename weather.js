class Weather {
  constructor() {
    // OpenWeatherMap key
    this.weatherKey = '9a5abfe4e6e3e16e4736753efec5c66b';
  }

  // Get weather data
  async getData(location) {
    // Make http request to OpenWeatherMap
    const weatherResponse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.state}&appid=${this.weatherKey}`
    );
    const weather = await weatherResponse.json();
    return weather;
  }
}
