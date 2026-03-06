import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveAuth } from "../utils/auth";
import Navbar from "../components/Navbar";
import "../assets/css/auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    college: "",
    gender: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          collegeName: formData.college,
          gender: formData.gender,
        }),
      });

      if (response.ok) {
        const regText = await response.text();
        console.log("REGISTER OK:", regText);

        const loginRes = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        console.log("LOGIN STATUS:", loginRes.status);

        const loginBodyText = await loginRes.text();
        console.log("LOGIN BODY:", loginBodyText);

        if (!loginRes.ok) {
          setError(loginBodyText || "Registered, but login failed. Please login manually.");
          navigate("/login", { replace: true });
          return;
        }

        const data = JSON.parse(loginBodyText); // because we already read text
        saveAuth(data);

        console.log("TOKEN SAVED:", localStorage.getItem("token"));

        navigate("/dashboard", { replace: true });
      } else {
        const errorText = await response.text();
        setError(errorText || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Error connecting to server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card auth-card-signup">
          <div className="auth-header">
            <h2>Create Your Account</h2>
            <p className="auth-subtitle">Join PG Life and find your perfect accommodation</p>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error!</strong> {error}
              <button type="button" className="btn-close" onClick={() => setError("")}></button>
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="college" className="form-label">College/University</label>
              <input
                type="text"
                className="form-control"
                id="college"
                name="college"
                placeholder="Enter your college/university"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label d-block mb-2">Gender</label>

              <div className="gender-selector">

                <input
                  type="radio"
                  className="btn-check"
                  name="gender"
                  id="gender-male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  required
                />
                <label className="gender-btn" htmlFor="gender-male">
                   Male
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="gender"
                  id="gender-female"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                <label className="gender-btn" htmlFor="gender-female">
                   Female
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="gender"
                  id="gender-other"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                />
                <label className="gender-btn" htmlFor="gender-other">
                  Other
                </label>

              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-link-text">
              Already have an account?
              <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;