// Init objects
const storage = new Storage();
const geocode = new Geocode();
const weather = new Weather();
const ui = new UI();

// UI vars
const UIcity = document.querySelector('#city');
const UIstate = document.querySelector('#state');
const UIchangeBtn = document.querySelector('#w-change-btn');
const UIcurrBtn = document.querySelector('#w-curr-btn');

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', (e) =>
  storeCurrLocation('initial')
);

// Change location button event listener
UIchangeBtn.addEventListener('click', changeLocation);

// Current location button event listener
UIcurrBtn.addEventListener('click', (e) => storeCurrLocation('button'));

// Change location
function changeLocation(e) {
  if (UIcity.value !== '' && UIstate.value !== '') {
    const location = {
      city: UIcity.value,
      state: UIstate.value,
    };
    storage.setLocationData(location);
    setLocation(location, 'CityState');
    ui.clearCurrent();
    $('#locModal').modal('hide');
    ui.showAlert(
      `Changed location to ${location.city}, ${location.state}`,
      'alert alert-dismissible alert-success'
    );
  }
}

// Set location weather data
function setLocation(location, type) {
  if (type === 'LatLon') {
    // Make geocode http request
    geocode
      .getGeocode(location)
      .then((geo) => {
        location = {
          city: geo[3].long_name,
          state: geo[5].long_name,
        };
        // Store current location data
        storage.setLocationData(location);
        console.log('setLocation -> getGeocode', location);
        // Make weather http request
        weather.getData(location).then((data) => {
          // Add state to data
          data['state'] = location.state;
          // Show weather data
          ui.showData(data);
          console.log('setLocation -> data', data);
        });
      })
      .catch((err) => {
        ui.showAlert(
          `Error: ${err}\nPlease reload...`,
          'alert alert-dismissible alert-danger'
        );
      });
  } else if (type === 'CityState') {
    // Make weather http request
    weather.getData(location).then((data) => {
      // Add state to data
      data['state'] = location.state;
      // Show weather data
      ui.showData(data);
      console.log('setLocation -> data', data);
    });
  }
}

// Gets current location
function storeCurrLocation(event) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Current location
        currLocation = {
          currLat: position.coords.latitude,
          currLon: position.coords.longitude,
        };
        // Set current location
        setLocation(currLocation, 'LatLon');
        // Enable current location indicator
        ui.showCurrent();
        if (event === 'button') {
          ui.showAlert(
            'Changed location to current location',
            'alert alert-dismissible alert-success'
          );
        }
      },
      (error) => {
        if (event === 'initial') {
          const weatherLocation = storage.getLocationData();
          setLocation(weatherLocation, 'CityState');
        }
        switch (error.code) {
          case error.PERMISSION_DENIED:
            ui.showAlert(
              'User denied the request for geolocation',
              'alert alert-dismissible alert-danger'
            );
            break;
          case error.POSITION_UNAVAILABLE:
            ui.showAlert(
              'Location info is unavailable',
              'alert alert-dismissible alert-danger'
            );
            break;
          case error.TIMEOUT:
            ui.showAlert(
              'The request to get user location timed out',
              'alert alert-dismissible alert-danger'
            );
            break;
          case error.UNKNOWN_ERROR:
            ui.showAlert(
              'An unknown error occurred',
              'alert alert-dismissible alert-danger'
            );
            break;
        }
        ui.clearCurrent();
      }
    );
  } else {
    if (event === 'initial') {
      const weatherLocation = storage.getLocationData();
      setLocation(weatherLocation, 'CityState');
    }
    ui.showAlert(
      'Geolocation not supported by this browser',
      'alert alert-dismissible alert-danger'
    );
  }
}
