function formateDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function refreshWeather(response)
{
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement =  document.querySelector("#icon")
    
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather-icon" class="weather-app-icon" />`
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}Km/hr`;
    timeElement.innerHTML =  formateDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city)
{
    let apiKey = "ae3f8c51df9f85cto6c6be21144afb30";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event)
{
    event.preventDefault();    
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function displayForecast(){
    let days = ["Tue","Wed","Thu","Fri","Sat"];
    let forecastHTML = "";
    
    days.forEach(function (day){
        forecastHTML = forecastHTML + `<div class="weather-forecast-day">
                    <div class="weather-forecast-date">${day}</div>
                    <div class="weather-forecast-icon"></div>
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">18°</span>
                        <span class="weather-forecast-temperature-min">12</span>
                    </div>
                </div>`;
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("Delhi");
displayForecast();