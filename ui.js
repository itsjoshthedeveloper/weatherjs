class UI {
  constructor() {
    // UI vars
    this.location = document.querySelector('#w-location');
    this.desc = document.querySelector('#w-desc');
    this.temp = document.querySelector('#w-temp');
    this.icon = document.querySelector('#w-icon');
    this.details = document.querySelector('#w-details');
    this.humidity = document.querySelector('#w-humidity');
    this.pressure = document.querySelector('#w-pressure');
    this.feelslike = document.querySelector('#w-feelslike');
    this.wind = document.querySelector('#w-wind');
  }

  // Show data
  showData(data, type) {
    if (type === 'CityState') {
      this.location.textContent = `${data.name}, ${data.state}`;
    }
    this.desc.textContent = data.weather[0].main;
    this.temp.textContent = `${this.keltofah(
      data.main.temp
    )} F (${this.keltocel(data.main.temp)} C)`;
    this.icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    this.icon.alt = data.weather[0].description;
    this.humidity.textContent = `Relative Humidity: ${data.main.humidity}%`;
    this.pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
    this.feelslike.textContent = `Feels Like: ${this.keltofah(
      data.main.feels_like
    )} F (${this.keltocel(data.main.feels_like)} C)`;
    this.wind.textContent = `Wind: ${data.wind.speed} MPH at ${data.wind.deg}\xB0`;
  }

  // Convert from Kelvin to Fahrenheit
  keltofah(kel) {
    return ((kel - 273.15) * (9 / 5) + 32).toFixed(2);
  }

  // Convert from Kelvin to Celsius
  keltocel(kel) {
    return (kel - 273.15).toFixed(2);
  }
}
