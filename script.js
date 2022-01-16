// get humiditiy 

const weatherIcon = document.querySelector("#weatherIcon");
const cityName = document.querySelector("h1")
const cityInfo = document.querySelector("p")
const dateInfo = document.querySelector(".date")
const inputCity = document.querySelector("input")
const weatherDesc = document.querySelector("#weatherDesc")
const currentTemp = document.querySelector("#currentTemp")
const lowTemp = document.querySelector("#lowTemp")
const highTemp = document.querySelector("#highTemp")
const feelsTemp = document.querySelector("#feelsTemp")
const wind = document.querySelector("#wind")
const humidity = document.querySelector("#humidity")



const getWeather = async(city) =>{
    try{
        let API_KEY = "6249bf40f4eef32e48f195d2cdbcc634"
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city  + '&appid=' + API_KEY)
        let data = await response.json()
        let weatherDesc = data.weather[0].main
        let name = data.name
        let temp = " " + String(Math.round(data.main.temp - 273.15) + "°C")
        let temp_min =  " " + String(Math.round(data.main.temp_min - 273.15) + "°C")
        let temp_max = " " + String(Math.round(data.main.temp_max - 273.15) + "°C")
        let feelsLikeTemp = String(Math.round(data.main.feels_like - 273.15) + "°C")
        let windSpeed = String(data.wind.speed + " mph")
        let humidity = String(data.main.humidity  + " %")
        let infoList = weatherDesc
        let timeZone = data.timezone / 3600
        return [weatherDesc,name,temp,temp_min,temp_max, feelsLikeTemp,windSpeed,humidity,infoList,timeZone]}
        catch(error){
            return error
        }
};

function getLocalTime(offset){
    let today = new Date(Date.now() + offset * 1000).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric"
        });
    return today
}

function changeWeatherIcon(weather){
    weather = weather.toLowerCase()
    if(weather == "clear"){
        weather = "sun"
    }
    if(weather.at(-1) == "s"){
        weather = weather.slice(0,-1)
    }
    if(weather == "rain"){
        weather = "cloud-rain"
    }
    if(weather == "snow"){
        weather = "snowflake"
    }
    weatherIcon.classList.remove(weatherIcon.classList[1])
    weatherIcon.classList.add("fa-" + weather)
}



function loadInfo(city){

    getWeather(city).then((result) =>{
        cityName.innerHTML = result[1]
        cityInfo.innerHTML = result
        dateInfo.innerHTML = getLocalTime(result[9])
        weatherDesc.innerHTML = result[0]
        currentTemp.innerHTML = result[2]
        lowTemp.innerHTML = result[3]
        highTemp.innerHTML = result[4]
        feelsTemp.innerHTML = result[5]
        wind.innerHTML = result[6]
        humidity.innerHTML = result[7]
        changeWeatherIcon(result[0])
    })
}

loadInfo("london")

inputCity.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        loadInfo(inputCity.value)
    }
});
