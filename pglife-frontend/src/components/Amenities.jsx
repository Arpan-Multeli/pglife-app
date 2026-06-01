import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/Amenities.css";

const CATEGORY_MAP = {
  Building: ["Power Backup", "Lift"],
  "Common Area": ["WiFi", "TV", "Water Purifier", "Dining", "Washing Machine"],
  Bedroom: ["Bed with Mattress", "Air Conditioner"],
  Washroom: ["Geyser"],
};

const ICON_MAP = {
  "Power Backup": "powerbackup.svg",
  "Lift": "lift.svg",
  "WiFi": "wifi.svg",
  "TV": "tv.svg",
  "Water Purifier": "rowater.svg",
  "Dining": "dining.svg",
  "Washing Machine": "washingmachine.svg",
  "Bed with Mattress": "bed.svg",
  "Air Conditioner": "ac.svg",
  "Geyser": "geyser.svg",
};

const CATEGORY_ICONS = {
  Building: "fas fa-building",
  "Common Area": "fas fa-couch",
  Bedroom: "fas fa-bed",
  Washroom: "fas fa-shower",
};

// ✅ Accept optional prop
const Amenities = ({ amenities: amenitiesProp }) => {
  const { id } = useParams();
  const [amenitiesFromApi, setAmenitiesFromApi] = useState([]);

  // ✅ If props not provided, fetch from backend (your current behavior)
  useEffect(() => {
    if (Array.isArray(amenitiesProp)) return; // props given -> no fetch

    fetch(`http://localhost:8080/api/amenities/property/${id}`)
      .then((res) => res.json())
      .then((data) => setAmenitiesFromApi(Array.isArray(data) ? data.map((a) => a.name) : []))
      .catch((err) => console.log(err));
  }, [id, amenitiesProp]);

  // ✅ final amenities source
  const amenities = useMemo(() => {
    if (Array.isArray(amenitiesProp)) {
      // supports ["WiFi"] OR [{name:"WiFi"}]
      return amenitiesProp.map((a) => (typeof a === "string" ? a : a?.name)).filter(Boolean);
    }
    return amenitiesFromApi;
  }, [amenitiesProp, amenitiesFromApi]);

  const hasAmenity = (name) => amenities.includes(name);

  return (
    <div className="amenities-section">
      <h2 className="section-title">Amenities</h2>

      <div className="categories-grid">
        {Object.entries(CATEGORY_MAP).map(([category, items]) => {
          const available = items.filter(hasAmenity);
          return (
            <div className="amenity-category" key={category}>
              <div className="category-label">
                <i className={CATEGORY_ICONS[category]} style={{ marginRight: 6 }} />
                {category}
              </div>

              {available.length === 0 ? (
                <div className="amenity-empty">None listed</div>
              ) : (
                available.map((item) => (
                  <div className="amenity-item" key={item}>
                    <img
                      src={`/img/amenities/${ICON_MAP[item]}`}
                      alt={item}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <span>{item}</span>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Amenities;