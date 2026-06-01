import React from "react";
import"../assets/css/Testimonials.css";

const testimonials = [
  {
    name: "Ashutosh Gowariker",
    text: "You just have to arrive at the place, it's fully furnished and everything is taken care of. Best PG experience in Mumbai!",
    rating: 5,
    avatar: "/img/man.png",
  },
  {
    name: "Karan Johar",
    text: "You just have to arrive at the place, it's fully furnished and the staff is extremely helpful. Highly recommend to anyone new to the city.",
    rating: 5,
    avatar: "/img/man.png",
  },
];

const Testimonials = () => (
  <div className="testimonials-section">
    <h2 className="section-title">What people say</h2>

    <div className="testimonials-list">
      {testimonials.map((t, index) => (
        <div className="t-card" key={index}>
          <img className="t-avatar" src={t.avatar} alt={t.name} />
          <div className="t-body">
            <div className="t-header">
              <div className="t-name">{t.name}</div>
              <div className="t-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>
            </div>
            <p className="t-text">{t.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Testimonials;
