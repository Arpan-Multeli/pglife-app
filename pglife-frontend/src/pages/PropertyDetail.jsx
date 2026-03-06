import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumb';
import ImageCarousel from '../components/ImageCarousel';
import Amenities from '../components/Amenities';
import PropertyAbout from '../components/PropertyAbout';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { getLoggedInUser } from "../utils/auth";
import { getPropertyById, getFavoriteProperties, addFavorite, removeFavorite } from "../services/api";
import "../assets/css/property_detail.css";

function PropertyDetail() {
  const { id } = useParams();
  const propertyId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getLoggedInUser();
  const userId = user?.id;


  const [property, setProperty] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(propertyId)) return;
    getPropertyById(propertyId).then(setProperty);
    if (userId) {
      getFavoriteProperties(userId).then((favorites) => {
        setIsFavorite(favorites.some((p) => p.id === propertyId));
      });
    }
  }, [propertyId, userId]);

  const toggleFavorite = () => {
    if (!userId) { navigate("/login", { state: { from: location } }); return; }
    if (!Number.isFinite(propertyId)) return;
    if (isFavorite) {
      removeFavorite(userId, propertyId).then(() => setIsFavorite(false));
    } else {
      addFavorite(userId, propertyId).then(() => setIsFavorite(true));
    }
  };

  const handleBookNow = async () => {
    try {
      const user = getLoggedInUser();

      if (!user?.id) {
        navigate("/login", { state: { from: location } });
        return;
      }

      // 1️⃣ Create booking
      const bookingRes = await fetch("http://localhost:8080/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          propertyId: property.id
        })
      });

      const bookingData = await bookingRes.json();

      // 2️⃣ Create Razorpay order
      const orderRes = await fetch("http://localhost:8080/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: bookingData.bookingId
        })
      });

      const orderData = await orderRes.json();

      // 3️⃣ Open Razorpay popup
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PGLife",
        description: "Booking Payment",
        order_id: orderData.orderId,

        handler: async function (response) {
          try {
            const verifyRes = await fetch("http://localhost:8080/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId: bookingData.bookingId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();

            alert(verifyData.message || "Payment verified and booking confirmed!");

          } catch (err) {
            console.error(err);
            alert("Verification failed");
          }
        },

        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed to start");
    }
  };

  if (!Number.isFinite(propertyId)) return <div className="container mt-5">Invalid property id.</div>;
  if (!property) return (
    <div className="property-page">
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center", color: "#aaa", fontFamily: "'DM Sans', sans-serif" }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: 28, color: "#e8952a", marginBottom: 12 }} />
          <p>Loading property...</p>
        </div>
      </div>
    </div>
  );
  const ratingValue = Number(property.rating ?? 0);

  const genderValue = String(property.gender || property.genderType || "").toLowerCase();

  const genderLabel =
    genderValue === "male" ? "Boys" :
      genderValue === "female" ? "Girls" :
        "Co-ed";

  const genderImg =
    property.genderIcon ||
    property.gender_icon ||
    (genderValue === "male"
      ? "/img/male.png"
      : genderValue === "female"
        ? "/img/female.png"
        : "/img/unisex.png");

  return (
    <div className="property-page">
      <Navbar />

      <div className="page-header-bar">
        <div className="container">
          <div className="breadcrumb">
            <Breadcrumbs />
          </div>
        </div>
      </div>

      {/* ── Hero Image ── */}
      <div className="hero-image-wrap">
        <ImageCarousel
          imageUrl={`/img/properties/${propertyId}/1.jpg`}
          propertyName={property.name}
        />
      </div>

      {/* ── Two-column layout ── */}
      <div className="detail-layout">

        {/* ── Left: Content ── */}
        <div className="detail-content">

          {/* Summary card */}
          <div className="summary-card">
            <div className="summary-top">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={
                      i < Math.round(ratingValue) ? "fas fa-star" : "far fa-star"
                    }
                  />
                ))}
                <span>{ratingValue ? ratingValue.toFixed(1) : "N/A"}</span>
              </div>
              <button
                className={`fav-pill${isFavorite ? " active" : ""}`}
                onClick={toggleFavorite}
              >
                <i className={isFavorite ? "fas fa-heart" : "far fa-heart"} />
                {isFavorite ? "Saved" : "Save"}
                <span className="interested-count">· {property.interestedCount ?? 0} interested</span>
              </button>
            </div>

            <h1 className="property-name">{property.name}</h1>
            <div className="property-address">
              <i className="fas fa-map-marker-alt" />
              {property.address}
            </div>

            <div className="property-meta-tags">


              <div className="meta-tag">
                <img
                  src={genderImg}
                  alt={genderLabel}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                {genderLabel}
              </div>

              <div className="meta-tag">
                <i className="fas fa-home" style={{ color: "#e8952a", fontSize: 13 }} />
                Paying Guest
              </div>
            </div>
          </div>

          {/* About */}
          <PropertyAbout description={property.description} />

          {/* Amenities */}
          <Amenities />

          {/* Testimonials */}
          <Testimonials />

        </div>

        {/* ── Right: Sticky Booking Card ── */}
        <div className="booking-sidebar">
          <div className="booking-card">
            <div className="rent-label">Monthly Rent</div>
            <div className="rent-price">
              <sup>₹</sup>{Number(property.rent).toLocaleString("en-IN")}
            </div>
            <div className="rent-period">per month · all inclusive</div>

            <div className="divider" />

            <div className="perks">
              <div className="perk"><i className="fas fa-wifi" /> High-speed WiFi included</div>
              <div className="perk"><i className="fas fa-bolt" /> Power backup available</div>
              <div className="perk"><i className="fas fa-shield-alt" /> Verified property</div>
              <div className="perk"><i className="fas fa-calendar-check" /> Flexible move-in dates</div>
            </div>

            <button className="book-btn" onClick={handleBookNow} >
              <i className="fas fa-calendar-alt" />
              Book Now
            </button>

            <div className="contact-note">A small payment required to book</div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default PropertyDetail;
