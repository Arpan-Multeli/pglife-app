import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/LandingPage.css";
import Navbar from "../components/Navbar";

export default function LandingPage() {
    const [bannerVisible, setBannerVisible] = useState(true);
    const navigate = useNavigate();

    const handleStart = () => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/home");
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="pg-root">
            <Navbar variant="landing" />

            {/* ── HERO ────────────────────────────────────────── */}
            <main className="pg-hero">
                <div className="pg-pill">
                    <span className="pg-pill-dot" />
                    <span>Trusted by 2,00,000+ tenants across India</span>
                </div>

                <h1 className="pg-headline">
                    The smartest way to find a{" "}
                    <span className="pg-grad-orange">PG</span>{" "}
                    <span className="pg-grad-teal">that feels like home.</span>
                </h1>

                <p className="pg-subline">
                    Browse thousands of verified paying guest accommodations across India's major cities.
                    Filter by budget, amenities, and gender — and move in with confidence.
                </p>

                <div className="pg-ctas">
                    <button className="pg-cta-primary" onClick={handleStart}>
                        Find Your Perfect PG  &nbsp;→
                    </button>
                </div>

                <div className="pg-trust">
                    {[
                        ["5K+", "Active Listings"],
                        ["4 ", "Cities"],
                        ["4.8★", "Avg Rating"],
                        ["2L+", "Happy Tenants"],
                    ].map(([val, lbl], i, arr) => (
                        <React.Fragment key={lbl}>
                            <div className="pg-trust-item">
                                <span className="pg-trust-val">{val}</span>
                                <span className="pg-trust-lbl">{lbl}</span>
                            </div>
                            {i < arr.length - 1 && <div className="pg-trust-div" />}
                        </React.Fragment>
                    ))}
                </div>
            </main>

            {/* bottom badge */}
            <div className="pg-demo-badge">
                <span className="pg-demo-dot" />
                Live preview of <strong>&nbsp;PG Life</strong>
            </div>
        </div>
    );
}