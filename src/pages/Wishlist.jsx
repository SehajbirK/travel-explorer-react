import Navbar from "../components/Navbar";

export default function Wishlist() {
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-semibold mb-2">My Wishlist ❤️</h1>
        {items.length === 0 && <p className="text-gray-500">No destinations saved yet.</p>}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
