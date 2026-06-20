import { useState } from "react";
import "./WeatherApp.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "bd5e378503939ddaee76f12ad7a97608";

  const getWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedCity)}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "City not found.");
        setWeather(null);
        return;
      }

      setError("");
      setWeather(data);
    } catch (fetchError) {
      setError("Unable to fetch weather. Please try again.");
      setWeather(null);
      console.error("Weather fetch error:", fetchError);
    }
  };

  return (
    <div className="container weather-container">
      <h1>Weather App 🌦️</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-result">
          <h2 className="text-white">{weather.name}</h2>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>{weather.weather?.[0]?.main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;