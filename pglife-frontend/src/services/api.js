const BASE_URL = "http://localhost:8080/api";
const FAVORITES_URL = "http://localhost:8080/api/favorites";

const toValidId = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
};


const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
};

// get properties by city
export const getPropertiesByCity = (cityId) => {
  return authFetch(`${BASE_URL}/properties/city/${cityId}`)
    .then(res => res.json());
};

// get favorite properties of user
export const getFavoriteProperties = (userId) => {
  return authFetch(`${BASE_URL}/favorites/user/${userId}`)
    .then(async (res) => {
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    });
};
// add favorite
export const addFavorite = (userId, propertyId) => {
  const validUserId = toValidId(userId);
  const validPropertyId = toValidId(propertyId);

  if (!validUserId || !validPropertyId) {
    return Promise.reject(new Error("Invalid userId/propertyId for addFavorite"));
  }

  return authFetch(
    `${FAVORITES_URL}/add?userId=${validUserId}&propertyId=${validPropertyId}`,
    { method: "POST" }
  ).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return res.text(); // "Added to favorites"
  });
};

// remove favorite
export const removeFavorite = (userId, propertyId) => {
  const validUserId = toValidId(userId);
  const validPropertyId = toValidId(propertyId);

  if (!validUserId || !validPropertyId) {
    return Promise.reject(new Error("Invalid userId/propertyId for removeFavorite"));
  }

  return authFetch(
    `${FAVORITES_URL}/remove?userId=${validUserId}&propertyId=${validPropertyId}`,
    { method: "DELETE" }
  ).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return res.text(); // "Removed from favorites"
  });
};

export const getPropertyById = (id) => {
  const validId = toValidId(id);
  if (!validId) return Promise.reject(new Error("Invalid property id"));

  return authFetch(`${BASE_URL}/properties/${validId}`)
    .then(res => res.json());
};

export const getUserById = (id) => {
  return authFetch(`${BASE_URL}/users/${id}`).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  });
};
