import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "../utils/auth";
import "../assets/css/navbar.css";

const NAV_LINKS = ["Explore", "Features", "Cities", "Blog", "About"];

export default function Navbar({ variant = "default" }) {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const [bannerVisible, setBannerVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropRef = useRef(null);
  const isLanding = variant === "landing";

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  const handleListProperty = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const role = localStorage.getItem("role");

      if (!userId) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      if (role === "OWNER") {
        navigate("/OwnerDashboard");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/auth/upgrade-owner/${userId}`, {
        method: "PUT",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to upgrade to owner");
        return;
      }

      localStorage.setItem("role", data.role || "OWNER");
      localStorage.setItem("fullName", data.fullName || localStorage.getItem("fullName") || "");
      localStorage.setItem("userId", String(data.userId || userId));
      localStorage.setItem("email", data.email || localStorage.getItem("email") || "");

      alert("You are now an owner");
      navigate("/OwnerDashboard");
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("Something went wrong");
    }
  };

  const displayName =
    localStorage.getItem("fullName") ||
    user?.fullName ||
    user?.name ||
    "Profile";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleComingSoon = (e) => {
    e.preventDefault();
    alert("🚧 This feature is coming soon!");
  };

  return (
    <div className="nb-wrapper">
      {bannerVisible && (
        <div className="nb-banner">
          <span>
            🏠 Now available in 4 major cities —{" "}
            <Link to="/search" className="nb-banner-link">
              Explore PGs near you →
            </Link>
          </span>
          <button
            className="nb-banner-x"
            onClick={() => setBannerVisible(false)}
            aria-label="Close banner"
            type="button"
          >
            ✕
          </button>
        </div>
      )}

      <header className={`nb-nav ${scrolled ? "nb-scrolled" : ""}`}>
        <div className="nb-inner">
          {/* Logo from landing page */}
          <div className="nb-nav-logo">
            <Link to="/" className="nb-logo">
              <img src="/img/logo.png" alt="PG Life" className="nb-logo-img" />
            </Link>
          </div>

          <nav className="nb-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                to="#"
                onClick={handleComingSoon}
                className="nb-link"
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="nb-actions">
            {isLanding ? (
              <>
                <button className="nb-nav-globe" type="button">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width="18"
                    height="18"
                  >
                    <circle cx="10" cy="10" r="8" />
                    <path d="M10 2a14.5 14.5 0 0 1 0 16M10 2a14.5 14.5 0 0 0 0 16M2 10h16" />
                  </svg>
                </button>

                <Link to="/login" className="nb-btn-signin">
                  Sign In
                </Link>
                <Link to="/signup" className="nb-btn-signup">
                  Sign Up
                </Link>
              </>
            ) : user ? (
              <>
                <button className="nb-btn-list" onClick={handleListProperty} type="button">
                  🏘️ List Property
                </button>

                <div className="nb-profile-wrap" ref={dropRef}>
                  <button
                    className={`nb-profile-btn ${dropdownOpen ? "open" : ""}`}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    type="button"
                  >
                    <div className="nb-avatar">{initials}</div>
                    <span className="nb-profile-name">Profile</span>
                    <span className={`nb-chevron ${dropdownOpen ? "up" : ""}`}>
                      ▾
                    </span>
                  </button>

                  <div className={`nb-dropdown ${dropdownOpen ? "open" : ""}`}>
                    <Link
                      to="/profile"
                      className="nb-drop-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="nb-drop-icon">👤</span> My Profile
                    </Link>

                    <div className="nb-drop-sep" />

                    <button
                      className="nb-drop-item nb-drop-danger"
                      onClick={handleLogout}
                      type="button"
                    >
                      <span className="nb-drop-icon">🚪</span> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nb-btn-signin">
                  Sign In
                </Link>
                <Link to="/signup" className="nb-btn-signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}