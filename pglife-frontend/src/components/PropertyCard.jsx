import { Link } from "react-router-dom";
import "../assets/css/PropertyCard.css";

const PropertyCard = ({ property, cityName, isFavorite, onToggleFavorite, from = "properties" }) => {
    const { id, name, address, rent, rating, gender, imageUrl, genderIcon, amenities = [] } = property;

    const genderValue = String(gender || "").toLowerCase();

    const genderLabel =
        genderValue === "male" ? "Boys" :
            genderValue === "female" ? "Girls" :
                "Co-ed";

    const genderImg =
        genderIcon ||
        (genderValue === "male"
            ? "/img/male.png"
            : genderValue === "female"
                ? "/img/female.png"
                : "/img/unisex.png");
    return (
        <div className="pg-card">

            {/* Image */}
            <div className="card-image">
                <img src={imageUrl} alt={name || "Property"} />
                <div className="rating-badge">
                    <i className="fas fa-star" />
                    {rating ?? "N/A"}
                </div>
            </div>

            {/* Body */}
            <div className="card-body">

                <div>
                    <div className="card-top">
                        <div>
                            <div className="pg-name">{name}</div>
                            <div className="pg-address">
                                <i className="fas fa-map-marker-alt" />
                                {address}
                            </div>
                        </div>
                        <button
                            className={`fav-btn${isFavorite ? " active" : ""}`}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite?.(id); }}
                            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <i className={isFavorite ? "fas fa-heart" : "far fa-heart"} />
                        </button>
                    </div>

                    <div className="card-meta">

                        <div className="gender-tag">
                            <img
                                src={genderImg}
                                alt={genderLabel}
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                            {genderLabel}
                        </div>

                        {amenities.slice(0, 2).map((a, idx) => {
                            const key = typeof a === "string" ? a : (a.id ?? a.name ?? idx);
                            const label = typeof a === "string" ? a : (a.name ?? "Amenity");

                            return (
                                <div key={key} className="amenity-tag">
                                    <i className="fas fa-check" style={{ fontSize: 10 }} /> {label}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="card-footer-row">
                    <div className="rent-block">
                        <div className="rent-amount">
                            ₹{Number(rent).toLocaleString("en-IN")}/-
                            <span>per month</span>
                        </div>
                    </div>
                    <Link
                        to={
                            from === "dashboard"
                                ? `/property/${property.id}`
                                : `/property/${property.id}?city=${encodeURIComponent(cityName)}`
                        }
                        state={{
                            propertyName: property.name,
                            from: from,
                            city: cityName
                        }}
                        className="view-btn"
                    >
                        View Details <i className="fas fa-arrow-right" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PropertyCard;
