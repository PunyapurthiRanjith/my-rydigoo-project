import { PHOTON_API_URL, PHOTON_REVERSE_URL } from "../config/maps";
import {
  assertCoordInIndia,
  INDIA_ONLY_MESSAGE,
  INDIA_PHOTON_BBOX,
  isCoordInIndia,
  isPhotonFeatureInIndia,
} from "../utils/indiaBounds";

const formatPhotonFeature = (feature) => {
  const props = feature.properties;
  const parts = [props.name, props.street, props.city, props.state, props.country].filter(
    Boolean
  );
  return [...new Set(parts)].join(", ");
};

const formatCoordinateLabel = (lat, lng) =>
  `My Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

const mapFeatureToPlace = (feature) => ({
  label: formatPhotonFeature(feature),
  lat: feature.geometry.coordinates[1],
  lng: feature.geometry.coordinates[0],
});

export const searchPlaces = async (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const response = await fetch(
    `${PHOTON_API_URL}/?q=${encodeURIComponent(query.trim())}&limit=10&bbox=${INDIA_PHOTON_BBOX}&lang=en`
  );

  if (!response.ok) {
    throw new Error("Address search failed. Check your internet connection.");
  }

  const data = await response.json();

  return data.features
    .filter(isPhotonFeatureInIndia)
    .map(mapFeatureToPlace)
    .slice(0, 6);
};

export const reverseGeocode = async (lat, lng) => {
  assertCoordInIndia(lat, lng, "Your location");

  try {
    const response = await fetch(
      `${PHOTON_REVERSE_URL}?lon=${lng}&lat=${lat}&lang=en`
    );

    if (!response.ok) {
      return { label: formatCoordinateLabel(lat, lng), lat, lng };
    }

    const data = await response.json();
    const feature = data.features?.find(isPhotonFeatureInIndia);

    if (!feature) {
      return { label: formatCoordinateLabel(lat, lng), lat, lng };
    }

    return {
      label: formatPhotonFeature(feature) || formatCoordinateLabel(lat, lng),
      lat,
      lng,
    };
  } catch (error) {
    if (error.message.includes("outside India")) {
      throw error;
    }
    return { label: formatCoordinateLabel(lat, lng), lat, lng };
  }
};

export const getCurrentLocationPlace = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (!isCoordInIndia(lat, lng)) {
            reject(
              new Error(
                `Your GPS location is outside India. ${INDIA_ONLY_MESSAGE}`
              )
            );
            return;
          }

          const place = await reverseGeocode(lat, lng);
          resolve(place);
        } catch (error) {
          reject(error);
        }
      },
      () => reject(new Error("Could not access your location. Allow GPS permission."))
    );
  });

export const geocodeAddress = async (addressText) => {
  const results = await searchPlaces(addressText);
  if (results.length === 0) {
    throw new Error(
      `No matching location found in India for "${addressText}". ${INDIA_ONLY_MESSAGE}`
    );
  }
  return results[0];
};

export const validatePlaceInIndia = (place, label = "Location") => {
  if (!place?.lat || !place?.lng) {
    return { valid: false, reason: `${label} coordinates are missing.` };
  }

  if (!isCoordInIndia(place.lat, place.lng)) {
    return { valid: false, reason: `${label} must be within India.` };
  }

  return { valid: true };
};
