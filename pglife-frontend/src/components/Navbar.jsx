import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "../utils/auth";
import "../assets/css/navbar.css";  
const Navbar = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload(); // temporary refresh
  };

  return (
    <nav className={`pglife-navbar navbar navbar-expand-md bg-white sticky-top${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-container">

        {/* ── Logo left ── */}
        <Link to="/">
          <img src="/img/logo.png" alt="PG Life" className="brand-logo" />
        </Link>

        {/* ── Mobile toggler ── */}
        <button
          className="navbar-toggler d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#my-navbar"
          aria-controls="my-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* ── Links right ── */}
        <div className="collapse navbar-collapse" id="my-navbar">
          <div className="nav-actions">

            {user ? (
              <>
                <Link className="pgl-ghost" to="/dashboard">
                  <i className="fas fa-th-large" />
                  Dashboard
                </Link>
                <div className="nav-sep d-none d-md-block" />
                <button className="pgl-cta" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="pgl-ghost" to="/signup">
                  <i className="fas fa-user-plus" />
                  Sign up
                </Link>
                <div className="nav-sep d-none d-md-block" />
                <Link className="pgl-cta" to="/login">
                  <i className="fas fa-sign-in-alt" />
                  Login
                </Link>
              </>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
