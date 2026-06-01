import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/landingPage.css";
import Navbar from "../components/Navbar";
import bgImage from "../assets/img/bg.png";

export default function LandingPage() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleStart = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/home");
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className={`lp-root ${loaded ? "lp-loaded" : ""}`}>
            <Navbar variant="landing" />

            {/* ── FULL-SCREEN HERO ─────────────────────────────── */}
            <section className="lp-hero">
                {/* Background image layer */}
                <div
                    className="lp-hero-bg"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
                {/* Cinematic overlay */}
                <div className="lp-hero-overlay" />

                {/* Content grid: left text + right card */}
                <div className="lp-hero-content">
                    {/* ── LEFT COLUMN ── */}
                    <div className="lp-hero-left">
                        <div className="lp-tag">
                            <span className="lp-tag-dot" />
                            <span>India's #1 PG Discovery Platform</span>
                        </div>

                        <h1 className="lp-title">
                            Find Your
                            <br />
                            <span className="lp-title-accent">Perfect PG</span>
                            <br />
                            Stay.
                        </h1>

                        <p className="lp-desc">
                            Verified paying guest accommodations across India's top cities. 
                            Search by budget, amenities, and location — move in with confidence.
                        </p>

                        <div className="lp-cta-row">
                            <button className="lp-cta-start" onClick={handleStart}>
                                Get Started
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                            <button className="lp-cta-explore" onClick={() => navigate("/search")}>
                                Explore PGs
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN: Glass Info Card ── */}
                    <div className="lp-hero-right">
                        <div className="lp-glass-card">
                            <div className="lp-glass-header">
                                <span className="lp-glass-live" />
                                <span>Live Availability</span>
                            </div>
                            <div className="lp-glass-stats">
                                <div className="lp-glass-stat">
                                    <span className="lp-glass-num">5,200+</span>
                                    <span className="lp-glass-label">Active Listings</span>
                                </div>
                                <div className="lp-glass-divider" />
                                <div className="lp-glass-stat">
                                    <span className="lp-glass-num">4</span>
                                    <span className="lp-glass-label">Major Cities</span>
                                </div>
                            </div>
                            <div className="lp-glass-cities">
                                {["Delhi", "Mumbai", "Bengaluru", "Chennai"].map((city) => (
                                    <span key={city} className="lp-glass-city">{city}</span>
                                ))}
                            </div>
                            <div className="lp-glass-rating">
                                <div className="lp-stars">
                                    {"★★★★★".split("").map((s, i) => (
                                        <span key={i} className="lp-star">{s}</span>
                                    ))}
                                </div>
                                <span className="lp-rating-text">4.8 avg · 2L+ happy tenants</span>
                            </div>
                        </div>
                    </div>
                </div>

                
            </section>
        </div>
    );
}