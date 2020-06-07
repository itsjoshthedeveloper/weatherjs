// Init Weather object
const weather = new Weather();

// Set new location
function setLocation(city, state) {
  weather.getData(city, state).then((data) => {
    console.log(data);
  });
}

// Init first location
setLocation(weather.city, weather.state);
