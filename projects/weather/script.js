const apiKey = "6198bb26dff32a0cf2966587a56cc54c"; // Replace with OpenWeatherMap API key
const btn = document.getElementById("getWeatherBtn");
const input = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");
const body = document.body;

btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        resultDiv.innerHTML = "City not found!";
        body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
        return;
      }

      // Weather icon based on main weather
      let iconClass = "";
      const weatherMain = data.weather[0].main;
      switch(weatherMain) {
        case "Clear": iconClass = "fas fa-sun"; body.style.background = "linear-gradient(to right, #fceabb, #f8b500)"; break;
        case "Clouds": iconClass = "fas fa-cloud"; body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)"; break;
        case "Rain": iconClass = "fas fa-cloud-showers-heavy"; body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)"; break;
        case "Snow": iconClass = "fas fa-snowflake"; body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)"; break;
        case "Thunderstorm": iconClass = "fas fa-bolt"; body.style.background = "linear-gradient(to right, #373b44, #4286f4)"; break;
        default: iconClass = "fas fa-smog"; body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
      }

      resultDiv.innerHTML = `
        <i class="${iconClass}"></i>
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(err => {
      resultDiv.innerHTML = "Error fetching data";
      console.log(err);
    });
});

