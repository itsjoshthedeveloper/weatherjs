class Weather {
  constructor() {
    this.city = 'New York';
    this.state = 'New York';
    this.apiKey = '9a5abfe4e6e3e16e4736753efec5c66b';
  }

  async getData(city, state) {
    this.city = city;
    this.state = state;
    const weatherResponse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apiKey}`
    );
    const weather = await weatherResponse.json();
    return weather;
  }
}
