import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import weatherImg from "../assets/weather.jpg";
import mapImg from "../assets/map.jpg";
import heartImg from "../assets/heart.jpg";
import homeImg from "../assets/home.jpg";

function Feature({ title, desc, img, bgColor }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
      <div className="h-56 w-full relative">
        <img src={img} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className={`p-6 bg-gradient-to-br ${bgColor}`}>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-700 text-sm">{desc}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      {/*  HERO SECTION */}
      <div className="relative h-[75vh] w-full">
        <img
          src={homeImg}
          alt="Travel background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white"></div>


        {/* Centered content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl font-bold text-white mb-6">
            Explore the World Your Way
          </h1>
          <SearchBar />
        </div>
      </div>

      {/* ⬇️ FEATURES SECTION */}
      <div className="max-w-6xl mx-auto p-10 text-center">
        <div className="grid md:grid-cols-3 gap-10">
          <Feature
            title="Live Weather"
            desc="Check weather for cities."
            img={weatherImg}
            bgColor="from-blue-50 to-blue-100"
          />
          <Feature
            title="Country Info"
            desc="Languages, population, currency."
            img={mapImg}
            bgColor="from-green-50 to-green-100"
          />
          <Feature
            title="Wishlist"
            desc="Save your favorite cities."
            img={heartImg}
            bgColor="from-pink-50 to-pink-100"
          />
        </div>
      </div>
    </>
  );
}
