import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";
import.meta.env.VITE_UNSPLASH_KEY

export default function Search() {
  const { city } = useParams();

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <h2 className="text-3xl font-semibold mb-2">
          Search Results
        </h2>
        <p className="text-gray-500 mb-8">
          Showing destinations related to "{city}"
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <DestinationCard city={city} />
        </div>
      </div>
    </>
  );
}
