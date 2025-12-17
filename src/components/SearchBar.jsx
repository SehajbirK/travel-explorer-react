import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!city.trim()) return;
    navigate(`/search/${encodeURIComponent(city.trim())}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <input
        type="text"
        placeholder="Enter any city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}
