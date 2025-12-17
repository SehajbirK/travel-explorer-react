import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import.meta.env.VITE_UNSPLASH_KEY

export default function DestinationCard({ city }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${city}&per_page=1&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.results.length > 0) {
          setImage(data.results[0].urls.regular);
        }
      })
      .catch(() => setImage(null));
  }, [city]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 w-full bg-gray-200">
        {image ? (
          <img src={image} alt={city} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            Loading image...
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{city}</h3>
        <p className="text-gray-500 text-sm mb-5">
          Discover culture, live weather, and must-see places.
        </p>

        <Link
          to={`/destination/${city}`}
          className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
