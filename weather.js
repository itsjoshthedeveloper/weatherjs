class Weather {
  constructor() {
    // Default location
    this.location = {
      city: 'Suwanee',
      state: 'Georgia',
    };
    // API key
    this.apiKey = '9a5abfe4e6e3e16e4736753efec5c66b';
  }

  // Get weather data
  async getData(location, type) {
    // If given city and state
    if (type === 'CityState') {
      // Make http request
      const weatherResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.state}&appid=${this.apiKey}`
      );
      const weather = await weatherResponse.json();
      return weather;
    }
  }
}
