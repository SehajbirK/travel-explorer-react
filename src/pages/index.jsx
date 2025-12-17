import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore the World Your Way</h1>
        <p className="text-gray-600 mb-6">Search cities and plan your trips.</p>
        <div className="max-w-md mx-auto">
          <SearchBar />
        </div>
      </div>
    </>
  );
}
