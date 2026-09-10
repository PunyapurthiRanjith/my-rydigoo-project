export const INDIA_SERVICE = {
  countryCode: "IN",
  countryName: "India",
  minLat: 6.0,
  maxLat: 37.0,
  minLng: 68.0,
  maxLng: 97.5,
};

/** Photon bbox: minLon,minLat,maxLon,maxLat */
export const INDIA_PHOTON_BBOX = `${INDIA_SERVICE.minLng},${INDIA_SERVICE.minLat},${INDIA_SERVICE.maxLng},${INDIA_SERVICE.maxLat}`;

export const INDIA_ONLY_MESSAGE =
  "Rydigoo currently serves locations within India only.";

export const isCoordInIndia = (lat, lng) => {
  const latitude = Number(lat);
  const longitude = Number(lng);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return false;
  }

  return (
    latitude >= INDIA_SERVICE.minLat &&
    latitude <= INDIA_SERVICE.maxLat &&
    longitude >= INDIA_SERVICE.minLng &&
    longitude <= INDIA_SERVICE.maxLng
  );
};

export const assertCoordInIndia = (lat, lng, label = "This location") => {
  if (!isCoordInIndia(lat, lng)) {
    throw new Error(`${label} is outside India. ${INDIA_ONLY_MESSAGE}`);
  }
};

export const isPhotonFeatureInIndia = (feature) => {
  if (!feature?.geometry?.coordinates) {
    return false;
  }

  const props = feature.properties || {};
  const countryCode = String(props.countrycode || props.country_code || "").toLowerCase();
  if (countryCode === "in") {
    return true;
  }

  const country = String(props.country || "").toLowerCase();
  if (country === "india" || country.includes("india")) {
    return true;
  }

  const [lng, lat] = feature.geometry.coordinates;
  return isCoordInIndia(lat, lng);
};
