const weather_form = document.querySelector("#weather-form");
const city_input = document.querySelector("#city-input");
const status_msg = document.querySelector("#status-msg");
const city_display = document.querySelector("#city-display");
//const weather_card = document.querySelector("#weather-card");
const temp_display = document.querySelector("#temp-display");
const humidity_display= document.querySelector("#humidity-display");
const wind_display = document.querySelector("#wind-display")

const country_display = document.querySelector("#country-display");
const lat_display = document.querySelector("#lat-display");
const lon_display = document.querySelector("#lon-display");



weather_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = city_input.value.trim();
    city_input.value="";
    city_input.placeholder="Fetching data";
    
    

    const location = await getCoordinates(city); 
        city_display.textContent=`Weather for ${city}`;
        country_display.textContent=`${location.country},  ${city}` ;
        lat_display.textContent = `${location.latitude}`;
        lon_display.textContent = `${location.longitude}`;
   
    const weather = await getWeather(location.latitude, location.longitude);
    
    temp_display.textContent = `${weather.temperature_2m}°C`;
    humidity_display.textContent = `${weather.relative_humidity_2m}%`;
    wind_display.textContent = `${weather.wind_speed_10m}km/h`;
    if (weather.value !== 0){
        city_input.placeholder="Search More Cities";
    }
});
    
async function getCoordinates(city){
    try{
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const data = await response.json();
        
        if (!data.results || data.results.length === 0){
            city_input.placeholder="City not found. Cheak the spelling!."
            return null;
        }
        return data.results[0];
        
        
    }catch{

        city_input.placeholder="cheak your internet connection";
        return null;

    }
}

async function getWeather(lat,lon){
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        const data = await response.json();

        

        return data.current;
    }catch{
        city_input.placeholder="Error to fetch data from cloud";
    }
}