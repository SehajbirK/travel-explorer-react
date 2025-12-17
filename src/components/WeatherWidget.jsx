import { useEffect, useState } from "react";

export default function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const key = import.meta.env.VITE_WEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    };
    fetchWeather();
  }, [city]);

  if (!weather) return <p>Loading weather...</p>;
  if (weather.cod !== 200) return <p>Weather not found</p>;

  return (
    <div className="p-4 bg-blue-100 rounded">
      <h4 className="font-semibold">{weather.name}</h4>
      <p>{weather.weather[0].description}</p>
      <p>{weather.main.temp}°C</p>
    </div>
  );
}
