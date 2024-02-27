const url = "https://restcountries.com/v3.1/all";
fetch(url)
  .then((data) => data.json())
  .then((countries) => {
    const countriesContainer = document.getElementById("countries-container");

    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      const countryDiv = document.createElement("div");
      countryDiv.classList.add(
        "country-card",
        "col-sm-6",
        "col-md-4",
        "col-lg-4",
        "col-xl-4"
      );
      const nativeName =
        country.name && country.name.nativeName && country.name.nativeName.eng
          ? country.name.nativeName.eng.common || "N/A"
          : "N/A";

          countryDiv.innerHTML = `
          <div class="card h-100">
              <div class="card-header">
                  <h5 class="card-title">${country.name.common}</h5>
              </div>
              <div class="card-body">
                  <img src="${country.flags.svg}" class="card-img-top" alt="Flag">
                  <div class="card-text">Region: ${country.region}</div>
                  <div class="card-text">Capital: ${country.capital}</div>
                  <div class="card-text">Countrycode: ${country.cca3}</div>
                  <div class="card-text">Native Name: ${nativeName}</div>
                  <div class="card-text">Population: ${country.population}</div>
                  <button class="btn btn-primary" onclick="getWeatherData(${country.latlng[0]}, ${country.latlng[1]}, '${country.cca3}', '${country.name.common}')">
                      Click for Weather
                  </button>
                  <div id="weather-${country.cca3}" class="mt-3"></div>
              </div>
          </div>
          `;
      countriesContainer.appendChild(countryDiv);
    }
 });

function getWeatherData(latitude, longitude, countryCode) {
  const apiKey = "8a02350c859d72fd590d6f4bb751370d";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetch(weatherUrl)
    .then((data) => data.json())
    .then((weather) => {
      const weatherContainer = document.getElementById(
        `weather-${countryCode}`
      );
      if (weatherContainer) {
        weatherContainer.innerHTML = `
          <p class="card-text"><strong>Temperature:</strong> ${weather.main.temp}°C</p>
          <p class="card-text"><strong>Weather:</strong> ${weather.weather[0].description}</p>
        `;
      }
    });
}