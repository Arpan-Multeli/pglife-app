import { Link } from "react-router-dom";
import {FaInstagram, FaLinkedinIn, FaGithub, FaGlobe} from "react-icons/fa";
import "../assets/css/footer.css";

function Footer() {
  return (
    <footer className="pglife-footer">

      <div className="footer-inner">
        <div className="footer-grid">

          {/* ── Brand column ── */}
          <div>
            <div className="footer-brand-name">
              PG<span>Life</span>
            </div>
            <p className="footer-desc">
              Find comfortable and affordable PG accommodations in major cities across India.
            </p>
            <div className="footer-badge">
              <i className="fas fa-shield-alt" />
              Verified Listings Only
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h5 className="footer-col-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/properties?city=Delhi">PG in Delhi</Link></li>
              <li><Link to="/properties?city=Mumbai">PG in Mumbai</Link></li>
              <li><Link to="/properties?city=Bangalore">PG in Bangalore</Link></li>
              <li><Link to="/properties?city=Hyderabad">PG in Hyderabad</Link></li>
            </ul>
          </div>

          {/* ── Connect ── */}
          <div>
            <h5 className="footer-col-title">Connect With Us</h5>
            <div className="footer-social">
              <a
                href="https://yourportfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio"
              >
                <FaGlobe />
              </a>

              <a
                href="https://www.instagram.com/arpan_172"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/in/arpan-multeli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/Arpan-Multeli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} <span>PG Life</span>. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact</a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;