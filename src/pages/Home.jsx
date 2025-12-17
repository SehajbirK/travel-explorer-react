import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import homeImg from "../assets/home.jpg";
import weatherImg from "../assets/weather.jpg";
import mapImg from "../assets/map.jpg";
import heartImg from "../assets/heart.jpg";
import.meta.env.VITE_UNSPLASH_KEY

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <img
          src={homeImg}
          alt="Travel Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/10"></div>

        <div className="relative max-w-4xl mx-auto py-32 px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Explore the World <br /> Your Way
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow-md">
            Find the best destinations, check live weather, and plan your trips effortlessly.
          </p>

          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-3 gap-10">
        <Feature
          title="Live Weather"
          desc="Get real-time weather updates for your destinations."
          img={weatherImg}
          bgColor="from-blue-50 to-blue-100"
        />
        <Feature
          title="Country Info"
          desc="Languages, population, currency, and more at a glance."
          img={mapImg}
          bgColor="from-green-50 to-green-100"
        />
        <Feature
          title="Wishlist"
          desc="Save your favorite destinations and plan future trips."
          img={heartImg}
          bgColor="from-pink-50 to-pink-100"
        />
      </div>
    </>
  );
}

function Feature({ title, desc, img, bgColor }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
      <div className="h-56 w-full relative">
        <img src={img} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      <div className={`p-6 bg-gradient-to-br ${bgColor}`}>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-700 text-sm">{desc}</p>
      </div>
    </div>
  );
}
