import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const propertyName = location.state?.propertyName;
  

  // ✅ get city from current URL
  const queryParams = new URLSearchParams(location.search);
  const cityName =
    queryParams.get("city") || location.state?.city;

  const formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  const propertiesLink = cityName
    ? `/properties?city=${encodeURIComponent(cityName)}`
    : "/properties";

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb py-2">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;

          // ✅ If route is /property/:id, don't show "property" crumb
          if (
            value === "property" &&
            pathnames[index + 1] &&
            !isNaN(pathnames[index + 1])
          ) {
            return null;
          }

          // ✅ If this is the ID, show: Properties (with city) + Property Name
          const from = location.state?.from;

          if (!isNaN(value)) {
            return (
              <>
                {from === "dashboard" ? (
                  <li key="dashboard" className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                ) : (
                  <li key="properties" className="breadcrumb-item">
                    <Link to={propertiesLink}>Properties</Link>
                  </li>
                )}

                <li
                  key={`prop-${value}`}
                  className="breadcrumb-item active"
                  aria-current="page"
                >
                  {propertyName || `Property ${value}`}
                </li>
              </>
            );
          }

          const to = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <li key={to} className={`breadcrumb-item ${isLast ? "active" : ""}`}>
              {isLast ? formatName(value) : <Link to={to}>{formatName(value)}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;