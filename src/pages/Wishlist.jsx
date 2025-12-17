import Navbar from "../components/Navbar";

export default function Wishlist() {
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-semibold mb-4">My Wishlist ❤️</h1>
        {items.length === 0 && <p>No cities added yet.</p>}
        <ul className="list-disc pl-6">
          {items.map((city, i) => <li key={i}>{city}</li>)}
        </ul>
      </div>
    </>
  );
}
