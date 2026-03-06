// src/components/ImageCarousel.jsx
import React from "react";

const DEFAULT_IMG = "/img/properties/default.jpg";

const ImageCarousel = ({ imageUrl, propertyName }) => {
  const getImageUrl = (url) => {
    const clean = (url || "").trim();
    if (!clean) return DEFAULT_IMG;

    if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
    if (clean.startsWith("/img/")) return clean;
    if (clean.startsWith("img/")) return `/${clean}`;

    return `/img/properties/${clean}`;
  };

  const displayImageUrl = getImageUrl(imageUrl);

  return (
    <div id="property-images" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src={displayImageUrl}
            alt={propertyName || "Property image"}
            style={{ height: "500px", objectFit: "cover" }}
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src.includes("default.jpg")) return;
              e.currentTarget.src = DEFAULT_IMG;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;