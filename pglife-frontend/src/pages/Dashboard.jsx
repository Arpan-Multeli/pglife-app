import { useEffect, useState } from "react";
import { getFavoriteProperties, removeFavorite } from "../services/api";
import { getLoggedInUser, logout } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaHeart, FaEdit, FaEnvelope, FaPhone, FaVenusMars, FaUniversity } from "react-icons/fa";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { getUserById } from "../services/api";
import Breadcrumbs from '../components/Breadcrumb';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import "../assets/css/dashboard.css";
import PropertyCard from "../components/PropertyCard";


function Dashboard() {
  const user = getLoggedInUser();
  const navigate = useNavigate();
  const [interestedProperties, setInterestedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }
    getUserById(user.id)
      .then((u) => setProfile(u))
      .catch(() => setProfile(null));

    loadInterestedProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const loadInterestedProperties = () => {
    setLoading(true);
    setError(null);

    getFavoriteProperties(user.id)
      .then(data => {
        console.log("Interested Properties:", data);
        setInterestedProperties(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Error loading interested properties:", err);
        setError("Failed to load interested properties");
        setInterestedProperties([]);
      })
      .finally(() => setLoading(false));
  };

  const handleRemoveFromInterested = (propertyId) => {
    removeFavorite(user.id, propertyId)
      .then(() => {
        setInterestedProperties(prev => prev.filter(p => p.id !== propertyId));
      })
      .catch(err => {
        console.error("Error removing property:", err);
        setError("Failed to remove property");
      });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  const savedCount = interestedProperties.length;

  return (
    <>
      <Navbar />

      <div className="page-header-bar">
        <div className="container">
          <div className="breadcrumb">
            <Breadcrumbs />
          </div>
        </div>
      </div>

      <div className="container my-4 dashboard-ui">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5 d-flex">
            <div className="pg-profile-card w-100">

              {/* Header Banner */}
              <div className="pg-profile-header">
                <span className="pg-profile-label">My Profile</span>
                <button className="pg-edit-btn">
                  <FaEdit size={13} />
                  Edit
                </button>
              </div>

              {/* Avatar + Name */}
              <div className="pg-profile-identity">
                <div className="pg-avatar-ring">
                  <div className="pg-avatar">
                    <FaUser size={28} />
                  </div>
                </div>
                <div className="pg-identity-text">
                  <h4 className="pg-user-name">{profile?.fullName || profile?.name || user?.fullName || user?.name}</h4>
                  <div className="pg-user-email">
                    <FaEnvelope size={11} style={{ marginRight: 5, color: "var(--pg-teal)" }} />
                    {profile?.email || user?.email}
                  </div>
                </div>
              </div>

              <div className="pg-divider" />

              {/* Info Grid */}
              <div className="pg-info-grid">
                <div className="pg-info-item">
                  <div className="pg-info-icon">
                    <FaPhone size={13} />
                  </div>
                  <div>
                    <div className="pg-info-label">Phone</div>
                    <div className="pg-info-value">{profile?.phone || "-"}</div>
                  </div>
                </div>

                <div className="pg-info-item">
                  <div className="pg-info-icon">
                    <FaVenusMars size={13} />
                  </div>
                  <div>
                    <div className="pg-info-label">Gender</div>
                    <div className="pg-info-value pg-capitalize">{profile?.gender || "-"}</div>
                  </div>
                </div>

                <div className="pg-info-item pg-info-full">
                  <div className="pg-info-icon">
                    <FaUniversity size={13} />
                  </div>
                  <div>
                    <div className="pg-info-label">College</div>
                    <div className="pg-info-value">{profile?.collegeName || profile?.college || "-"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 d-flex">
            <div className="pg-browse-block w-100">

              <div className="pg-blob pg-blob-1" />
              <div className="pg-blob pg-blob-2" />

              <span className="pg-browse-eyebrow">My List</span>
              <h3 className="pg-browse-heading">Interested Properties</h3>

              {/* Saved count */}
              <div className="pg-count-row">
                <div className="pg-count-bubble">
                  <FaHeart size={14} className="pg-count-heart" />
                  <span className="pg-count-number">{savedCount}</span>
                </div>
                <span className="pg-count-label">
                  {savedCount === 1 ? "property saved" : "properties saved"}
                </span>
              </div>

              {/* CTA */}

              <Link to="/properties?city=Mumbai" className="pg-browse-cta">
                <FaSearch size={14} />
                Browse Properties
                <FaArrowRight size={13} />
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* Favorite / Interested Properties */}
      <div className="container my-4 dashboard-ui">
        {/* Loading / Error */}
        {loading && <p className="text-muted mt-3">Loading interested properties...</p>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* Grid */}
        {!loading && interestedProperties.length === 0 ? (
          <div className="dash-empty mt-3">
            <div className="dash-empty-icon">🏠</div>
            <div className="fw-semibold">No interested properties yet</div>
            <div className="text-muted small mb-2">
              Browse properties and tap the heart to save them.
            </div>
          </div>
        ) : (
          !loading && (
            <div className="properties-grid">
              {interestedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  cityName={property.city || "Mumbai"}
                  from="dashboard" // agar city nahi aa rahi toh fallback
                  isFavorite={true}
                  onToggleFavorite={() => handleRemoveFromInterested(property.id)}
                />
              ))}
            </div>
          )
        )}
      </div>


      {/* Footer Component */}
      <Footer />
    </>
  );
}

export default Dashboard;
