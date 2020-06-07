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
    this.container = document.querySelector('.container');
    this.card = document.querySelector('#card');
    this.cardContents = document.querySelector('#card-contents');
  }

  // Show data
  showData(data) {
    this.location.textContent = `${data.name}, ${data.state}`;
    this.desc.textContent = data.weather[0].main;
    this.temp.textContent = `${this.keltofah(
      data.main.temp
    )} F (${this.keltocel(data.main.temp)} C)`;
    this.icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    this.icon.alt = data.weather[0].description;
    this.humidity.textContent = `Relative Humidity: ${data.main.humidity}%`;
    this.pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
    this.feelslike.textContent = `Feels Like: ${this.keltofah(
      data.main.feels_like
    )} F (${this.keltocel(data.main.feels_like)} C)`;
    this.wind.textContent = `Wind: ${this.mpsToMPH(
      data.wind.speed
    )} MPH going ${this.degToCompass(data.wind.deg)}`;
  }

  // Show alert message
  showAlert(msg, className) {
    // Clear any remaining alerts
    this.clearAlert();
    // Create and insert div
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = `
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    ${msg}
    `;
    this.container.insertBefore(div, this.card);

    setTimeout(this.clearAlert, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Show current location indicator
  showCurrent() {
    // Clear any remaining indicators
    this.clearCurrent();
    // Create and insert div
    const div = document.createElement('div');
    div.className = 'curr-indicator';
    div.innerHTML = `
    <img src="/images/arrow.png" class="mt-n1" id="icon-curr">
    <p class="d-inline m-1 text-white">Current Location</p>
    `;
    this.cardContents.insertBefore(div, this.location);
  }

  // Clear current location indicator
  clearCurrent() {
    const currIndicator = document.querySelector('.curr-indicator');
    if (currIndicator) {
      currIndicator.remove();
    }
  }

  // Convert from Kelvin to Fahrenheit
  keltofah(kel) {
    return ((kel - 273.15) * (9 / 5) + 32).toFixed(2);
  }

  // Convert from Kelvin to Celsius
  keltocel(kel) {
    return (kel - 273.15).toFixed(2);
  }

  // Convert from meters/sec to MPH
  mpsToMPH(mps) {
    return (mps * 2.237).toFixed(2);
  }

  // Convert from degrees to direction
  degToCompass(deg) {
    var val = Math.floor(deg / 22.5 + 0.5);
    var arr = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    return arr[val % 16];
  }
}
