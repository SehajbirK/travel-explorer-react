import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Destination() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
        );
        const data = await res.json();
        if (data.main) {
          setWeather({
            temp: `${data.main.temp}°C`,
            condition: data.weather[0].description,
          });
        } else {
          setWeather({ temp: "-", condition: "Not found" });
        }
      } catch (err) {
        setWeather({ temp: "-", condition: "Error" });
      }
    };

    fetchWeather();
  }, [city]);

  const addToWishlist = () => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!list.includes(city)) {
      list.push(city);
      localStorage.setItem("wishlist", JSON.stringify(list));
    }
    alert("Added to wishlist");
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{city}</h1>
        {weather ? (
          <p className="mb-4 text-gray-600">Weather: {weather.temp}, {weather.condition}</p>
        ) : (
          <p className="text-gray-500">Loading weather...</p>
        )}
        <button
          onClick={addToWishlist}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
        >
          Add to Wishlist
        </button>
      </div>
    </>
  );
}
