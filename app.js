// Init objects
const storage = new Storage();
const weather = new Weather();
const ui = new UI();

// Get stored location data
const weatherLocation = storage.getLocationData();

// UI vars
const UIcity = document.querySelector('#city');
const UIstate = document.querySelector('#state');
const UIbtn = document.querySelector('#w-change-btn');

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location button event listener
UIbtn.addEventListener('click', changeLocation);

// Change location
function changeLocation(e) {
  if (UIcity.value !== '' && UIstate.value !== '') {
    const location = {
      city: UIcity.value,
      state: UIstate.value,
    };
    storage.setLocationData(location);
    setLocation(location, 'CityState');
    $('#locModal').modal('hide');
  }
}

// Set location weather data
function setLocation(location, type) {
  // Make http request
  weather.getData(location, type).then((data) => {
    if (type === 'CityState') {
      // Add state to data
      data['state'] = location.state;
    }
    // Show weather data
    ui.showData(data, type);
    console.log(data);
  });
}

// Init first location
function getWeather(e) {
  setLocation(weatherLocation, 'CityState');
}
