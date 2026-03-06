import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for search
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

function Home() {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState(""); // Added missing state
  const navigate = useNavigate();

  const user = getLoggedInUser();
  const userId = user?.id;

  useEffect(() => {
    // Basic error handling to prevent crashes if API is not ready
    getPropertiesByCity(1).then(setProperties).catch(err => console.log("API Error:", err));
    if (userId) {
      getFavoriteProperties(userId).then(setFavorites).catch(err => console.log("API Error:", err));
    }
  }, [userId]);

  const allowedCities = ["mumbai", "delhi", "bangalore", "hyderabad"];

  const handleSearch = (e) => {
    e.preventDefault(); // ✅ stop form submit redirect

    const input = (city || "").trim().toLowerCase(); // ✅ use city (your state)

    if (!input) {
      alert("Please enter a city");
      return;
    }

    if (!allowedCities.includes(input)) {
      alert("City not found. Try Mumbai, Delhi, Bangalore, Hyderabad");
      return;
    }

    navigate(`/properties?city=${input}`); // ✅ navigate only if valid
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
      {/* Navbar Component */}
      <Navbar />

      {/* Banner */}
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Happiness per Square Foot</h1>

          <form onSubmit={handleSearch} className="hero-search">
            <input
              type="text"
              placeholder="Enter your city to search for PGs"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      {/* Major Cities */}
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

      {/* Footer Component */}
      <Footer />
    </>
  );
}

export default Home;
