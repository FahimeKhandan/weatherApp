const apiKey = "9c74030f9ca50197fb266b914f10d3a4";
let celicious = document.querySelector("#celicious");
let fahrenheit = document.querySelector("#fahrenheit");
let currentTemperature = document.querySelector("#current-temperature");
let weatherDescription = document.querySelector("#temp-description");
let currentLocation = document.querySelector("#current-location");
let currentIcon = document.querySelector('#current-icon')
let windSpeed = document.querySelector('#wind-speed')
let responseObj
let celiciousTemperature

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

//day and time
let now = new Date();
let todayElement = document.querySelector("#today");
let timeElement = document.querySelector("#time");

let getToday = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

todayElement.innerHTML = getToday;
timeElement.innerHTML = `${hour}:${minutes}`;

// search box
let searchBox = document.querySelector("#search-box");
let form = document.querySelector("form");
let currentCity = document.querySelector("#current-city");

function changeCurrentCity(event) {
  event.preventDefault();
  if(getTemperatureByCityName(searchBox.value)){
    currentCity.innerHTML = searchBox.value;
    searchBox.value = "";
  }
}

function getTemperatureByCityName(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function getTemperatureByCityGeo(lat, lon) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
 if(response){
  responseObj = response
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  celiciousTemperature = currentTemperature.innerHTML
  weatherDescription.innerHTML = response.data.weather[0].description;
  currentCity.innerHTML = response.data.name;
  currentIcon.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  windSpeed.innerHTML = Math.round(response.data.wind.speed)
  console.log(response.data.wind.speed);
  return true
  }
  return false
}


function displayCelicious(event){
  event.preventDefault()
  let temp = Math.round(celiciousTemperature)
  currentTemperature.innerHTML = temp;
}

function displayFahrenheit(event){
  event.preventDefault()
  let temp = Math.round((celiciousTemperature * 9 ) / 5 + 32)
  currentTemperature.innerHTML = temp;
}


function handlePosition(position) {
  getTemperatureByCityGeo(position.coords.latitude, position.coords.longitude);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

celicious.addEventListener("click", displayCelicious);
fahrenheit.addEventListener("click", displayFahrenheit);

form.addEventListener("submit", changeCurrentCity);
currentLocation.addEventListener("click", getCurrentLocation);

getTemperatureByCityName('london')