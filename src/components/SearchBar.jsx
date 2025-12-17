import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-5 rounded-r-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
}
