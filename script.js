const apiKey = "56c734311d39ff208ae0a52de2b56975"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("error");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherByCity(city);
  } else {
    errorMsg.textContent = "Please enter a city name.";
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      },
      () => {
        errorMsg.textContent = "Unable to access your location.";
      }
    );
  } else {
    errorMsg.textContent = "Geolocation is not supported by your browser.";
  }
});

async function getWeatherByCity(city) {
  const apiKey = "56c734311d39ff208ae0a52de2b56975"; // your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  fetchWeatherData(url);
}


async function getWeatherByCity(city) {
  const apiKey = "56c734311d39ff208ae0a52de2b56975"; // your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  fetchWeatherData(url);
}


async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      errorMsg.textContent = "City not found. Please try again.";
      weatherCard.classList.add("hidden");
      return;
    }

    displayWeather(data);
  } catch (error) {
    errorMsg.textContent = "Error fetching weather data.";
  }
}

function displayWeather(data) {
  errorMsg.textContent = "";
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;

  weatherCard.classList.remove("hidden");
}
