import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/home.css";
import {
  getPropertiesByCity,
  addFavorite,
  removeFavorite,
  getFavoriteProperties
} from "../services/api";
import { getLoggedInUser } from "../utils/auth";

const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    viewBox="0 0 20 20"
  >
    <circle cx="9" cy="9" r="6" />
    <path d="m15 15-3-3" />
  </svg>
);

const STATS = [
  { val: "5K+", lbl: "Listings" },
  { val: "4 ", lbl: "Cities" },
  { val: "4.8★", lbl: "Avg Rating" },
  { val: "2L+", lbl: "Tenants" },
];

function Home() {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const user = getLoggedInUser();
  const userId = user?.id;

  useEffect(() => {
    getPropertiesByCity(1).then(setProperties).catch(err => console.log("API Error:", err));
    if (userId) {
      getFavoriteProperties(userId).then(setFavorites).catch(err => console.log("API Error:", err));
    }
  }, [userId]);

  const allowedCities = ["mumbai", "delhi", "bangalore", "hyderabad"];

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    const input = (city || "").trim().toLowerCase();

    if (!input) {
      alert("Please enter a city");
      return;
    }

    if (!allowedCities.includes(input)) {
      alert("City not found. Try Mumbai, Delhi, Bangalore, Hyderabad");
      return;
    }

    navigate(`/properties?city=${input}`);
  };

  const toggleFavorite = (propertyId) => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const isFav = favorites.some(p => p.id === propertyId);

    if (isFav) {
      removeFavorite(userId, propertyId).then(() =>
        setFavorites(prev => prev.filter(p => p.id !== propertyId))
      );
    } else {
      addFavorite(userId, propertyId).then(() =>
        setFavorites(prev => [...prev, { id: propertyId }])
      );
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hs-hero">
        <div className="hs-bg" />
        <div className="hs-glow" />

        <div className="hs-content">
          <div className="hs-pill">
            <span className="hs-pill-dot" />
            Trusted by 2,00,000+ tenants across India
          </div>

          <h1 className="hs-headline">
            <span className="hs-grad-orange">Happiness</span>{" "}
            per Square{" "}
            <span className="hs-grad-teal">Foot.</span>
          </h1>

          <p className="hs-subline">
            Browse thousands of verified PG accommodations across India's major
            cities. Filter by budget, amenities &amp; gender — and move in with
            confidence.
          </p>

          <div className="hs-search">
            <input
              type="text"
              className="hs-search-input"
              placeholder="Enter your city to search for PGs…"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="hs-search-btn" onClick={handleSearch}>
              <SearchIcon />
              Search
            </button>
          </div>

          <div className="hs-stats">
            {STATS.map((s, i) => (
              <React.Fragment key={s.lbl}>
                <div className="hs-stat">
                  <span className="hs-stat-val">{s.val}</span>
                  <span className="hs-stat-lbl">{s.lbl}</span>
                </div>
                {i < STATS.length - 1 && <div className="hs-stat-div" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Major Cities */}
      <div className="container mt-5">
        <h1 className="city-heading mb-5 text-center">Major Cities</h1>

        <div className="row justify-content-center text-center">
          {["Delhi", "Mumbai", "Bangalore", "Hyderabad"].map((cityName) => (
            <div className="col-md-3 col-6 mb-4" key={cityName}>
              <Link to={`/properties?city=${cityName.toLowerCase()}`} className="city-link">
                <div className="city-circle">
                  <img
                    src={`/img/${cityName.toLowerCase()}.png`}
                    alt={cityName}
                    className="city-icon"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
