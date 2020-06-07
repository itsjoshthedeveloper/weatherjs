// Init Weather object
const weather = new Weather();

// Init UI object
const ui = new UI();

// Set new location
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
