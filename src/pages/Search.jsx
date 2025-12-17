import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";

export default function Search() {
  const { city } = useParams();

  const cities = city ? [city] : [];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-10">
        <h2 className="text-3xl font-semibold mb-4">Search Results</h2>
        {cities.length === 0 && <p>No results found.</p>}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cities.map((c) => <DestinationCard key={c} city={c} />)}
        </div>
      </div>
    </>
  );
}
