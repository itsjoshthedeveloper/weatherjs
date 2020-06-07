class Geocode {
  constructor() {
    // Geocode key
    this.geocodeKey = 'AIzaSyC1Sc7ItF9HF66Be93cwKRjbrKd_B9jXG8';
  }

  // Get reverse geocode (address lookup)
  async getGeocode(location) {
    // Make http request to Google Geocode
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.currLat},${location.currLon}&key=${this.geocodeKey}`
    );
    const geocode = await geocodeResponse.json();
    return geocode.results[0].address_components;
  }
}
