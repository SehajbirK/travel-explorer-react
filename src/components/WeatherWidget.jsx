import { useEffect, useState } from "react";

export default function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const key = import.meta.env.VITE_OPENWEATHER_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=${key}&units=metric`
        );

        if (!res.ok) throw new Error("Weather API failed");

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="p-4 bg-blue-100 rounded">
      <h4>{weather.name}</h4>
      <p>{weather.weather[0].description}</p>
      <p>{weather.main.temp}°C</p>
    </div>
  );
}
