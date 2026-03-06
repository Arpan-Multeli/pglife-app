import React, { useEffect, useState } from "react";

const FilterModal = ({ current, onApply, onReset }) => {
  const [local, setLocal] = useState({
    gender: "ANY",      // "ANY" | "MALE" | "FEMALE" | "UNISEX"
    minRent: "",
    maxRent: "",
    amenities: [],
  });

  // When modal opens (or parent changes), sync local state
  useEffect(() => {
    if (current) setLocal(current);
  }, [current]);

  const toggleAmenity = (amenity) => {
    setLocal((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const apply = () => {
    onApply?.(local);
  };

  const reset = () => {
    const cleared = { minRent: "", maxRent: "", gender: "ANY", amenities: [] };
    setLocal(cleared);
    onReset?.();
  };

  return (
    <div
      className="modal fade"
      id="filter-modal"
      tabIndex="-1"
      aria-labelledby="filterModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="filterModalLabel">
              Filter Properties
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {/* Gender */}
            <div className="mb-4">
              <h6 className="mb-3">
                <strong>Gender Type</strong>
              </h6>

              <select
                className="form-select"
                value={local.gender}
                onChange={(e) => setLocal((p) => ({ ...p, gender: e.target.value }))}
              >
                <option value="ANY">Any</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="UNISEX">Unisex</option>
              </select>
            </div>

            {/* Rent range */}
            <div className="mb-4">
              <h6 className="mb-3">
                <strong>Rent Range</strong>
              </h6>
              <div className="row g-2">
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min Rent"
                    value={local.minRent}
                    onChange={(e) => setLocal((p) => ({ ...p, minRent: e.target.value }))}
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max Rent"
                    value={local.maxRent}
                    onChange={(e) => setLocal((p) => ({ ...p, maxRent: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <h6 className="mb-3">
                <strong>Amenities</strong>
              </h6>

              {["WiFi", "AC", "Washing Machine", "Parking"].map((a) => (
                <div className="form-check" key={a}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={a}
                    checked={local.amenities.includes(a)}
                    onChange={() => toggleAmenity(a)}
                  />
                  <label className="form-check-label" htmlFor={a}>
                    {a}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={reset}>
              Reset
            </button>

            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={apply}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;