import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Destination() {
  const { city } = useParams();
  const decodedCity = decodeURIComponent(city);

  const [weather, setWeather] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // -------- WEATHER ----------
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${decodedCity}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
        );

        if (!weatherRes.ok) throw new Error("City not found");

        const weatherJson = await weatherRes.json();
        setWeather({
          desc: weatherJson.weather[0].description,
          temp: weatherJson.main.temp,
          country: weatherJson.sys.country // country code added
        });

        // -------- UNSPLASH IMAGES ----------
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${decodedCity}&per_page=20&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
        );

        const json = await res.json();
        const imgs = json.results.map((img) => img.urls.regular);
        setImages(imgs);
      } catch (err) {
        console.error(err);
        setError("City not found or failed to load data.");
      }
    };

    fetchData();
  }, [decodedCity]);

  // Wishlist handler
  const addToWishlist = () => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!list.includes(decodedCity)) {
      list.push(decodedCity);
      localStorage.setItem("wishlist", JSON.stringify(list));
      alert(`${decodedCity} added to your wishlist! ❤️`);
    } else {
      alert(`${decodedCity} is already in your wishlist.`);
    }
  };

  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center p-16 text-red-600 font-semibold">
          {error}
        </div>
      </>
    );
  }

  if (!weather) {
    return (
      <>
        <Navbar />
        <p className="text-center p-10">Loading...</p>
      </>
    );
  }

  // Helper function for country flag emoji
  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return "";
    return String.fromCodePoint(
      0x1F1E6 + countryCode.charCodeAt(0) - 65,
      0x1F1E6 + countryCode.charCodeAt(1) - 65
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-10">
        {/* City Name with Flag */}
        <h1
          className="text-6xl mb-4 text-center flex justify-center items-center gap-4"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {decodedCity}
          <span>{getFlagEmoji(weather.country)}</span>
        </h1>

        {/* Weather Info */}
        <p className="text-center text-xl text-blue-600 font-semibold mb-6">
          {weather.desc}, {weather.temp.toFixed(1)}°C — {weather.country}
        </p>

        {/* Wishlist Button */}
        <div className="text-center mb-10">
          <button
            onClick={addToWishlist}
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition"
          >
            Add to Wishlist ❤️
          </button>
        </div>

        {/* Gallery */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Sneak Peek of {decodedCity}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {images.length
            ? images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                >
                  <img
                    src={img}
                    alt={`${decodedCity} view ${i + 1}`}
                    className="h-48 w-full object-cover"
                  />
                </div>
              ))
            : <p className="text-center text-gray-500 col-span-full">No images available</p>}
        </div>
      </div>
    </>
  );
}
