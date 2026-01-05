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
searchBtn.addEventListener("click",handlesearch);
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
