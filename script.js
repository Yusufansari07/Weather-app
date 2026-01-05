const apikey = "b27edd31a221c3e93ad38208c2a917c8";

//DOM Elements
const cityInput = document.getElementById("city");
const searchBtn = documentGetElementById("search");

const cityNameE1 = documentGetElementById("city-name");
const tempE1 = documentGetElementById("temp");
const conditionE1 = documentGetElementById("condition");
const humidityE1 = documentGetElementById("humidity");
const windE1 = documentGetElementById("wond");

// Event Listeners
searchBtn.addEventListener("click",handleSearch);
cityInput.addEventListener("keydown",(e) => {
    if(e.key === "Enter")handleSearch();
});

function handleSearch() {
    const city = cityInput.Value.trim();

    if(!city){
        alert("Enter a city name:");
        return;
    }

    fetchWeather(city);
}

//Fetch Weather data
async function fetchWeather(city){
    setLoading(true);

    try{
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${b27edd31a221c3e93ad38208c2a917c8}`
        );

        if(!res.ok){
            throw new Error("city not found");
        }

        const data = await res.json();
        updateUI(data);
       } catch (error) {
        showError(error.message);
       } finally {
        setLoading(false);
       }
    }

// Update UI
function updateUI(data) {
  cityNameE1.textContent = data.name;
  tempE1.textContent = `${Math.round(data.main.temp)}°C`;
  conditionE1.textContent = data.weather[0].description;
  humidityE1.textContent = `Humidity: ${data.main.humidity}%`;
  windE1.textContent = `Wind: ${Math.round(data.wind.speed)} km/h`;
}

// Loading state
function setLoading(isLoading) {
  if (isLoading) {
    tempE1.textContent = "--";
    conditionE1.textContent = "Loading...";
    humidityE1.textContent = "";
    windE1.textContent = "";
  }
}

// Error handler
function showError(message) {
  cityNameE1.textContent = "Error";
  tempE1.textContent = "--";
  conditionE1.textContent = message;
  humidityE1.textContent = "";
  windE1.textContent = "";
}