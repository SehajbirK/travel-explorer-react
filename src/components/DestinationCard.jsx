import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

/* Known cities (optional curated data) */
const sampleData = {
  Paris: {
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    description: "The city of light, famous for art, fashion, and culture."
  },
  "New York": {
    attractions: ["Statue of Liberty", "Central Park", "Times Square"],
    description: "The city that never sleeps, full of skyscrapers and culture."
  },
  Tokyo: {
    attractions: ["Shinjuku", "Tokyo Tower", "Senso-ji Temple"],
    description: "A bustling metropolis blending tradition and technology."
  }
};

export default function Destination() {
  const { city } = useParams();
  const decodedCity = decodeURIComponent(city);

  const [data, setData] = useState(null);
  const [images, setImages] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        /* ---------- WEATHER ---------- */
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${decodedCity}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
        );

        if (!weatherRes.ok) throw new Error("City not found");

        const weatherJson = await weatherRes.json();

        /* ---------- ATTRACTIONS ---------- */
        const attractions =
          sampleData[decodedCity]?.attractions || [
            `${decodedCity} skyline`,
            `${decodedCity} downtown`,
            `${decodedCity} landmark`
          ];

        const description =
          sampleData[decodedCity]?.description ||
          `Discover ${decodedCity}, explore its culture, landmarks, and lifestyle.`;

        setData({
          weather: `${weatherJson.weather[0].description}, ${weatherJson.main.temp}°C`,
          attractions,
          description
        });

        /* ---------- UNSPLASH IMAGES ---------- */
        const imgMap = {};

        await Promise.all(
          attractions.map(async (place) => {
            try {
              const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${place}&per_page=1&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
              );
              const json = await res.json();
              imgMap[place] = json.results[0]?.urls?.regular || null;
            } catch {
              imgMap[place] = null;
            }
          })
        );

        setImages(imgMap);
      } catch (err) {
        console.error(err);
        setError("City not found. Please try another city.");
      }
    };

    fetchAll();
  }, [decodedCity]);

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

  if (!data) {
    return (
      <>
        <Navbar />
        <p className="text-center p-10">Loading...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-4">{decodedCity}</h1>
        <p className="mb-4">{data.description}</p>

        <p className="text-blue-600 font-semibold mb-8">
          Weather: {data.weather}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {data.attractions.map((place, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              {images[place] ? (
                <img
                  src={images[place]}
                  alt={place}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Image unavailable
                </div>
              )}
              <div className="p-4 font-semibold text-center">{place}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
