import { useState, useEffect } from "react";
const listings = [/* your full data stays exactly the same */];

export default function Page() {
  const [currentListings, setCurrentListings] = useState(listings);
  const [favorites, setFavorites] = useState<number[]>([]);
useEffect(() => {

    initMap();

    loadFavorites();

  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav id="navBar" className="navbar">
        <div className="navbar-container">
          <div className="logo-section">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">StudentNest</span>
          </div>
          <div className="nav-menu">
            <a href="#" className="nav-item">Listings</a>
            <a href="#" className="nav-item">Wishlist</a>
            <a href="#" className="nav-item">For Landlords</a>
            <div className="location-display">
              <span className="location-icon">📍</span>
              <span className="location-text">Bamenda & Bambili</span>
            </div>
            <button className="signin-btn">Sign in</button>
          </div>
        </div>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="layout-wrapper">

        {/* LEFT PANEL */}
        <div className="left-panel">

          {/* FILTER TABS */}
          <div id="filterSection" className="filter-tabs">
            <button className="filter-tab active">
              <span>All Listings</span>
            </button>
            <button className="filter-tab">
              <span className="tab-icon">💰</span>
              <span>Price</span>
            </button>
            <button className="filter-tab">
              <span className="tab-icon">👥</span>
              <span>People</span>
            </button>
            <button className="filter-tab">
              <span className="tab-icon">⭐</span>
              <span>Amenities</span>
            </button>
            <button className="filter-tab">
              <span className="tab-icon">🎓</span>
              <span>By University</span>
            </button>
          </div>

          {/* HEADER */}
          <div id="headerSection" className="listings-header">
            <h1 className="listings-title">
              Furnished student apartments in Bamenda & Bambili
            </h1>
            <p className="results-count" id="resultsCounter">
              Loading listings...
            </p>
          </div>

          {/* SEARCH */}
          <div id="searchSection" className="search-section">
            <input
              type="text"
              id="searchBox"
              className="search-input"
              placeholder="Search by neighborhood, university, or property type..."
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* LISTINGS */}
          <div id="listingsContainer" className="listings-container">
            {/* Listings will be rendered here later */}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div id="mapContainer" className="map-container">
            <div id="map" className="map"></div>
          </div>

          <div id="mapFooter" className="map-footer">
            <p id="mapStatement">
              Showing <span id="mapCount">0</span> out of{" "}
              <span id="totalCount">0</span> listings
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <div id="listingModal" className="modal">
        <div className="modal-wrapper">
          <div className="modal-header">
            <button className="modal-close">&times;</button>
          </div>
          <div className="modal-body" id="modalBody">
            {/* Modal content */}
          </div>
        </div>
      </div>
    </div>
  );
}
