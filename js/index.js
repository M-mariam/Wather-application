let searchInput = document.getElementById("search");
let findBtn = document.getElementById('find');
let toDay = document.querySelector('.day');
let current_date = document.querySelector('.date');
let region = document.querySelector('.region');
let currentDegree = document.querySelector('.today_degree');
let todayIcon = document.querySelector('.today_icon'); 
let todayCondition = document.getElementById('condition');
let humidty = document.getElementById('humidty'); 
let wind = document.getElementById('wind');
let compass = document.getElementById('compass');


let nextDay = document.querySelectorAll(".nextday");
let nextdayIcon = document.querySelectorAll('.nextday_icon');
let nextdayDegree = document.querySelectorAll('.nextday_degree');
let nextdayCondition = document.querySelectorAll('#nextday_condition');
    
const monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

async function checkWeather(currentCity = 'Cairo') {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=57539dda176746fcaf4193911242006&q=${currentCity}&days=3`);
        var finalData = await response.json();
        console.log(finalData);
        displayTodayWeather(finalData);
        displayNextdayWeather(finalData)
    } catch (error) {
        document.getElementById('rowData').innerHTML = `<h2 class="text-center">${error}</h2>`;
    }
}
checkWeather();


function displayTodayWeather(finalData) {
    let date = new Date();
    console.log(date);
    toDay.innerHTML = days[date.getDay()];
    current_date.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    region.innerHTML = finalData.location.name;
    currentDegree.innerHTML = finalData.current.temp_c + "°C";
    todayIcon.setAttribute("src",`https:${finalData.current.condition.icon}`)
    todayCondition.innerHTML = finalData.current.condition.text;
    humidty.innerHTML = finalData.current.humidity + "%";
    wind.innerHTML = finalData.current.wind_kph + " kph";
    compass.innerHTML = finalData.current.wind_dir;
}


    function displayNextdayWeather(finalData) {
        for (let i = 0; i < nextDay.length; i++) {
            nextDay[i].innerHTML = days[new Date(finalData.forecast.forecastday[i+1].date).getDay()];
            nextdayIcon[i].setAttribute('src', `https:${finalData.forecast.forecastday[i+1].day.condition.icon}`);
            nextdayDegree[i].innerHTML = finalData.forecast.forecastday[i+1].day.maxtemp_c + "°C";
            nextdayCondition[i].innerHTML = finalData.forecast.forecastday[i+1].day.condition.text;
        }
    }

    findBtn.addEventListener("click", function() {
        let currentCity = searchInput.value;
        console.log(currentCity);
        checkWeather(currentCity);
    });

