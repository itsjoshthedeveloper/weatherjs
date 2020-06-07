// Init Weather object
const weather = new Weather();

// Init UI object
const ui = new UI();

// UI vars
const UIcity = document.querySelector('#city');
const UIstate = document.querySelector('#state');
const UIbtn = document.querySelector('#w-change-btn');

// Change location button event listener
UIbtn.addEventListener('click', changeLocation);

// Change location
function changeLocation(e) {
  if (UIcity.value !== '' && UIstate.value !== '') {
    const location = {
      city: UIcity.value,
      state: UIstate.value,
    };
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
setLocation(weather.location, 'CityState');
