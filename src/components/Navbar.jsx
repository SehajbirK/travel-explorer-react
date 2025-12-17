import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-800 via-indigo-400 to-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-wide">
          ✈ Travel Explorer
        </h1>

        <div className="flex gap-8 text-sm uppercase tracking-wide">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/wishlist" className="hover:text-yellow-300 transition">
            Wishlist
          </Link>
          <span className="opacity-70">Discover</span>
          <span className="opacity-70">About</span>
        </div>
      </div>
    </nav>
  );
}
