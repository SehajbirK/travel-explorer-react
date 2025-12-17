import { Link } from "react-router-dom";

export default function DestinationCard({ city }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
      <img
        src={`https://source.unsplash.com/600x400/?${city},travel`}
        alt={city}
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{city}</h3>
        <p className="text-gray-500 text-sm mb-5">
          Discover culture, weather, and top attractions.
        </p>
        <Link
          to={`/destination/${city}`}
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
