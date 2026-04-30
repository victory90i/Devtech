"use client";

import { useState, useEffect } from "react";

// ===== DATA =====
const listings = [
  {
    id: 1,
    title: "Cozy Studio",
    price: 650,
    location: "Near Campus",
    people: 1,
    images: ["🏢"],
    amenities: ["WiFi", "Furnished", "Kitchen"],
  },
  {
    id: 2,
    title: "1 Bedroom Apartment",
    price: 890,
    location: "City Center",
    people: 2,
    images: ["🏠"],
    amenities: ["WiFi", "Balcony", "Laundry", "Furnished"],
  },
];

// ===== PAGE =====
export default function Page() {
  const [currentListings, setCurrentListings] = useState(listings);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  // ===== INIT (like DOMContentLoaded) =====
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // ===== SAVE FAVORITES =====
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ===== FILTER FUNCTION =====
  function applyFilter(type: string) {
    let filtered = [...listings];

    if (type === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (type === "people") {
      filtered = filtered.filter((l) => l.people <= 2);
    } else if (type === "amenities") {
      filtered = filtered.filter((l) => l.amenities.length >= 3);
    }

    setCurrentListings(filtered);
  }

  // ===== SEARCH =====
  const filteredListings = currentListings.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase())
  );

  // ===== FAVORITE =====
  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>StudentNest</h1>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => applyFilter("price")}>Price</button>
        <button onClick={() => applyFilter("people")}>People</button>
        <button onClick={() => applyFilter("amenities")}>Amenities</button>
      </div>

      {/* LISTINGS */}
      <div>
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <div>{listing.images[0]}</div>
            <h3>{listing.title}</h3>
            <p>€{listing.price}/month</p>
            <p>{listing.location}</p>

            <button onClick={() => toggleFavorite(listing.id)}>
              {favorites.includes(listing.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
