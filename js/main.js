let day1Name = document.getElementById('day1Name');
let day1Date = document.getElementById('day1Date');
let monthName = document.getElementById('monthName')
let cityName = document.getElementById('cityName');
let day1Temp = document.getElementById('day1Temp');
let day1Icon = document.getElementById('day1Icon');
let day1Status = document.getElementById('day1Status');
let day1Humidity = document.getElementById('day1Humidity');
let day1Wind = document.getElementById('day1Wind');
let day1WindDir = document.getElementById('day1WindDir');

// Tomorrow & after Tomorrow
let dayName = document.querySelectorAll('.dayName');
let dayIcon = document.querySelectorAll('.dayIcon');
let dayMaxTemp = document.querySelectorAll('.dayMaxTemp');
let dayMinTemp = document.querySelectorAll('.dayMinTemp');
let dayStatus = document.querySelectorAll('.dayStatus');
let searchInput = document.getElementById('searchInput');
// let findBtn = document.getElementById('findBtn');

let req = {};
 async function getWeatherData(cityName){
    req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=155e1525ef484794a6075521251710&q=${cityName}&days=3&aqi=no&alerts=no`);
    let weatherResponse = await req.json();
    return weatherResponse;
};


// searchInput 
searchInput.addEventListener('input', function() {
    startApp(searchInput.value); 
})

// display today data 

function displayTodayData(data) {
    let date = new Date();
    day1Name.innerHTML = date.toLocaleDateString("en-US", {weekday: 'long'});
    day1Date.innerHTML = date.getDate();
    monthName.innerHTML = date.toLocaleDateString("en-US", {month: 'long'});
    cityName.innerHTML = data.location.name;
    day1Temp.innerHTML = data.current.temp_c;
    day1Icon.setAttribute('src', "https:" + data.current.condition.icon);
    day1Status.innerHTML = data.current.condition.text;
    day1Humidity.innerText = data.current.humidity;
    day1Wind.innerHTML = data.current.wind_kph;
    day1WindDir.innerHTML = data.current.wind_dir;
}   


// display next dayes data

function displayNextDayes(data) {
    let forecastData = data.forecast.forecastday;

    for (let i = 0; i < 2; i++) {
        let date = new Date(forecastData[i + 1].date);        
        dayName[i].innerHTML = date.toLocaleDateString("en-US", {weekday: 'long'});
    dayIcon[i].setAttribute('src', "https:" + forecastData[i + 1].day.condition.icon);
        dayMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
        dayMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
        dayStatus[i].innerHTML = forecastData[i + 1].day.condition.text;
    }
}

// start app
async function startApp(city='cairo') {

    let weatherData = await getWeatherData(city);
        if (!weatherData.error) {
            displayTodayData(weatherData) 
            displayNextDayes(weatherData)
        }
}
startApp();

