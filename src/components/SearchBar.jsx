import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  // All 20 sample cities
  const famousCities = [
    "Paris", "New York", "Tokyo", "London", "Dubai", "Sydney", "Rome",
    "Barcelona", "Amsterdam", "Istanbul", "Bangkok", "Singapore", "HongKong",
    "LosAngeles", "SanFrancisco", "Cairo", "RioDeJaneiro", "Moscow", "Athens", "Vancouver"
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <select
        className="border p-2 rounded w-64"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select a city</option>
        {famousCities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button
        onClick={() => city && navigate(`/search/${city}`)}
        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}
