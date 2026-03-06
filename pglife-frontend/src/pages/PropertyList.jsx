import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumb";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import FilterModal from "../components/FilterModal";
import { getLoggedInUser } from "../utils/auth";
import { getFavoriteProperties, addFavorite, removeFavorite } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/property_list.css";

const cityMap = {
  Mumbai: 1,
  Delhi: 2,
  Bangalore: 3,
  Hyderabad: 4,
};

const PropertyList = () => {
  // ✅ define hooks FIRST
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ now safe to use location
  const queryParams = new URLSearchParams(location.search);

  // ✅ read city from URL and make it safe
  const cityParam = (queryParams.get("city") || "").trim();

  const normalizedCity = cityParam
    ? cityParam.charAt(0).toUpperCase() + cityParam.slice(1).toLowerCase()
    : "";

  const cityId = normalizedCity ? cityMap[normalizedCity] : undefined;


  const user = getLoggedInUser();
  const userId = user?.id;

  const [dynamicProperties, setDynamicProperties] = useState([]);
  const [favorites, setFavorites] = useState([]); // array of propertyIds

  const [sortRent, setSortRent] = useState("NONE");

  const [filters, setFilters] = useState({
    maxRent: "",
    minRent: "",
    gender: "ANY",
    amenities: [],
  });

  // ✅ fetch properties by city
  useEffect(() => {
    if (!cityId) {
      setDynamicProperties([]);
      return;
    }

    fetch(`http://localhost:8080/api/properties/city/${cityId}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((p) => ({
            ...p,

            // ✅ normalize amenities (string[] or object[])
            amenities: Array.isArray(p.amenities)
              ? p.amenities
                .map((a) => (typeof a === "string" ? a : a?.name))
                .filter(Boolean)
              : [],

            // ✅ gender icon snake_case support
            genderIcon: p.genderIcon ?? p.gender_icon,

            // ✅ image url snake_case support
            imageUrl: p.imageUrl ?? p.image_url,

            // ✅ rating support (many possible keys)
            rating:
              p.rating ??
              p.avg_rating ??
              p.average_rating ??
              p.avgRating ??
              p.averageRating ??
              0,
          }))
          : [];

        setDynamicProperties(normalized);
      })
      .catch(() => setDynamicProperties([]));
  }, [cityId]);
  // ✅ load favorites from backend (IMPORTANT)
  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      return;
    }

    getFavoriteProperties(userId)
      .then((favProps) => {
        const ids = Array.isArray(favProps) ? favProps.map((p) => p.id) : [];
        setFavorites(ids);
      })
      .catch(() => setFavorites([]));
  }, [userId]);

  const allProperties = useMemo(
    () => (Array.isArray(dynamicProperties) ? dynamicProperties : []),
    [dynamicProperties]
  );

  const visibleProperties = useMemo(() => {
    let list = [...allProperties];

    if (filters.minRent !== "" && !Number.isNaN(Number(filters.minRent))) {
      list = list.filter((p) => Number(p.rent) >= Number(filters.minRent));
    }

    if (filters.maxRent !== "" && !Number.isNaN(Number(filters.maxRent))) {
      list = list.filter((p) => Number(p.rent) <= Number(filters.maxRent));
    }

    if (filters.gender !== "ANY") {
      list = list.filter(
        (p) => (p.genderType || p.gender || "").toUpperCase() === filters.gender
      );
    }

    // ⚠ only works if backend returns p.amenities array
    if (filters.amenities?.length > 0) {
      list = list.filter((p) => {
        const a = Array.isArray(p.amenities)
          ? p.amenities.map((x) => String(x).toUpperCase())
          : [];
        return filters.amenities.every((sel) => a.includes(sel.toUpperCase()));
      });
    }

    if (sortRent === "HIGH") {
      list.sort((a, b) => Number(b.rent) - Number(a.rent));
    } else if (sortRent === "LOW") {
      list.sort((a, b) => Number(a.rent) - Number(b.rent));
    }

    return list;
  }, [allProperties, sortRent, filters]);

  // ✅ NOW list heart will update DB + dashboard
  const toggleFavorite = (propertyId) => {
    if (!userId) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const pid = Number(propertyId);
    if (!Number.isFinite(pid)) return;

    if (favorites.includes(pid)) {
      removeFavorite(userId, pid).then(() => {
        setFavorites((prev) => prev.filter((x) => x !== pid));
      });
    } else {
      addFavorite(userId, pid).then(() => {
        setFavorites((prev) => [...prev, pid]);
      });
    }
  };

  return (
    <>
      <Navbar />

      {/* ── Page Header ── */}
      <div className="page-header-bar">
        <div className="container">
          <div className="breadcrumb">
            <Breadcrumbs />
          </div>
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-2">
            <h2>{normalizedCity? `PGs in ${normalizedCity}` : "Properties"}</h2>
            <div className="result-count">
              {visibleProperties?.length ?? 0} results found
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">

        {/* ── Filter Bar ── */}
        <div className="pg-filter-bar">
          <button
            className="pg-filter-btn"
            data-bs-toggle="modal"
            data-bs-target="#filter-modal"
          >
            <i className="fas fa-sliders-h" /> Filter
          </button>

          <div className="pg-filter-divider" />

          <button
            className={`pg-filter-btn${sortRent === "HIGH" ? " active" : ""}`}
            onClick={() => setSortRent("HIGH")}
          >
            <i className="fas fa-sort-amount-down" /> Highest rent first
          </button>

          <div className="pg-filter-divider" />

          <button
            className={`pg-filter-btn${sortRent === "LOW" ? " active" : ""}`}
            onClick={() => setSortRent("LOW")}
          >
            <i className="fas fa-sort-amount-up" /> Lowest rent first
          </button>
        </div>

        {/* ── Alerts ── */}
        {!cityId && (
          <div className="pg-alert-warning">
            Invalid or missing city. Try: <b>?city=Mumbai</b>, <b>?city=Delhi</b>,{" "}
            <b>?city=Bangalore</b>, <b>?city=Hyderabad</b>
          </div>
        )}

        {cityId && allProperties.length === 0 && (
          <div className="pg-alert-info">
            No properties found for <b>{normalizedCity}</b>.
          </div>
        )}

        {/* ── Property Cards ── */}
        {visibleProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            cityName={normalizedCity}
            isFavorite={favorites.includes(property.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}

      </div>

      <FilterModal
        current={filters}
        onApply={(newFilters) => setFilters(newFilters)}
        onReset={() =>
          setFilters({ minRent: "", maxRent: "", gender: "ANY", amenities: [] })
        }
      />

      <Footer />
    </>
  );
};

export default PropertyList;
