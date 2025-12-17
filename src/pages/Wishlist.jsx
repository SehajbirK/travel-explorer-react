import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Wishlist() {
  const storedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  const [items, setItems] = useState(storedItems);
  const [cityImages, setCityImages] = useState({}); // { city: [img1, img2, ...] }

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const city of items) {
        try {
          const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
              city
            )}&per_page=6&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
          );
          const json = await res.json();
          newImages[city] = json.results.map((img) => img.urls.small);
        } catch (err) {
          console.error("Failed to fetch images for", city, err);
          newImages[city] = [];
        }
      }
      setCityImages(newImages);
    };

    if (items.length > 0) fetchImages();
  }, [items]);

  // Remove a city from wishlist
  const removeCity = (cityToRemove) => {
    const updated = items.filter((c) => c !== cityToRemove);
    setItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-semibold mb-6 text-center">My Wishlist ❤️</h1>

        {items.length === 0 && <p className="text-center">No cities added yet.</p>}

        <div className="grid gap-10">
          {items.map((city) => (
            <div key={city} className="border rounded-xl p-4 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{city}</h2>
                <button
                  onClick={() => removeCity(city)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>

              {cityImages[city] && cityImages[city].length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cityImages[city].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${city} view ${i + 1}`}
                      className="rounded-lg h-32 w-full object-cover"
                    />
                  ))}
                </div>
              ) : (
                <p>No images available.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
