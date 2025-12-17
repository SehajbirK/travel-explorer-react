import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// Sample data for 20 cities
const sampleData = {
  Paris: {
    weather: "Sunny, 22°C",
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    description: "The city of light, famous for art, fashion, and culture."
  },
  "New York": {
    weather: "Cloudy, 18°C",
    attractions: ["Statue of Liberty", "Central Park", "Times Square"],
    description: "The city that never sleeps, full of skyscrapers and culture."
  },
  Tokyo: {
    weather: "Rainy, 16°C",
    attractions: ["Shinjuku", "Tokyo Tower", "Senso-ji Temple"],
    description: "A bustling metropolis blending tradition and technology."
  },
  London: {
    weather: "Foggy, 15°C",
    attractions: ["Big Ben", "London Eye", "Tower of London"],
    description: "Historic and modern city with iconic landmarks."
  },
  Dubai: {
    weather: "Hot, 34°C",
    attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"],
    description: "Luxury city known for skyscrapers and desert adventures."
  },
  Sydney: {
    weather: "Sunny, 25°C",
    attractions: ["Sydney Opera House", "Bondi Beach", "Harbour Bridge"],
    description: "Coastal city famous for its beaches and skyline."
  },
  Rome: {
    weather: "Sunny, 28°C",
    attractions: ["Colosseum", "Trevi Fountain", "Vatican City"],
    description: "Historic city full of ancient ruins and art."
  },
  Barcelona: {
    weather: "Sunny, 24°C",
    attractions: ["Sagrada Familia", "Park Güell", "La Rambla"],
    description: "Vibrant Spanish city known for Gaudí architecture and beaches."
  },
  Amsterdam: {
    weather: "Cloudy, 19°C",
    attractions: ["Canals", "Rijksmuseum", "Van Gogh Museum"],
    description: "Famous for canals, cycling culture, and historic museums."
  },
  Istanbul: {
    weather: "Sunny, 21°C",
    attractions: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar"],
    description: "A city that bridges Europe and Asia, rich in history."
  },
  Bangkok: {
    weather: "Hot, 32°C",
    attractions: ["Grand Palace", "Wat Arun", "Chatuchak Market"],
    description: "A vibrant city full of temples, street food, and nightlife."
  },
  Singapore: {
    weather: "Hot & Humid, 33°C",
    attractions: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa"],
    description: "Modern city-state famous for gardens, food, and skyline."
  },
  HongKong: {
    weather: "Cloudy, 27°C",
    attractions: ["Victoria Peak", "Tsim Sha Tsui", "Disneyland"],
    description: "Dynamic city with skyscrapers, harbors, and shopping streets."
  },
  LosAngeles: {
    weather: "Sunny, 26°C",
    attractions: ["Hollywood", "Santa Monica", "Griffith Observatory"],
    description: "Entertainment capital, beaches, and sunny weather."
  },
  SanFrancisco: {
    weather: "Foggy, 17°C",
    attractions: ["Golden Gate Bridge", "Alcatraz", "Fisherman’s Wharf"],
    description: "Known for hills, tech culture, and iconic landmarks."
  },
  Cairo: {
    weather: "Hot, 35°C",
    attractions: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili"],
    description: "Historic city with ancient monuments and rich culture."
  },
  RioDeJaneiro: {
    weather: "Sunny, 30°C",
    attractions: ["Christ the Redeemer", "Copacabana Beach", "Sugarloaf Mountain"],
    description: "Famous for beaches, carnival, and beautiful landscapes."
  },
  Moscow: {
    weather: "Cold, 5°C",
    attractions: ["Red Square", "Kremlin", "St. Basil's Cathedral"],
    description: "Historic Russian capital with iconic architecture."
  },
  Athens: {
    weather: "Sunny, 27°C",
    attractions: ["Acropolis", "Plaka", "Parthenon"],
    description: "Ancient Greek city full of ruins and history."
  },
  Vancouver: {
    weather: "Rainy, 14°C",
    attractions: ["Stanley Park", "Grouse Mountain", "Granville Island"],
    description: "Coastal Canadian city surrounded by mountains and water."
  }
};

export default function Destination() {
  const { city } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Try to fetch API (e.g., OpenWeather) if available
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!res.ok) throw new Error("API failed");
        const json = await res.json();
        setData({
          weather: `${json.weather[0].description}, ${json.main.temp}°C`,
          attractions: sampleData[city]?.attractions || [],
          description: sampleData[city]?.description || "Explore this amazing city."
        });
      } catch {
        // fallback to sample data
        setData(sampleData[city]);
      }
    };
    fetchWeather();
  }, [city]);

  const addToWishlist = () => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!list.includes(city)) {
      list.push(city);
      localStorage.setItem("wishlist", JSON.stringify(list));
    }
    alert(`${city} added to wishlist!`);
  };

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto p-10 text-center">
          <h1 className="text-4xl font-bold mb-4">{city}</h1>
          <p className="text-gray-500">No data available for this city.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-4">{city}</h1>
        <p className="text-gray-700 mb-4">{data.description}</p>
        <p className="text-blue-600 font-semibold mb-4">Weather: {data.weather}</p>

        <h2 className="text-2xl font-semibold mb-2">Top Attractions:</h2>
        <ul className="list-disc pl-6 mb-6">
          {data.attractions?.map((attr, i) => (
            <li key={i}>{attr}</li>
          ))}
        </ul>

        <button
          onClick={addToWishlist}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Add to Wishlist
        </button>
      </div>
    </>
  );
}
