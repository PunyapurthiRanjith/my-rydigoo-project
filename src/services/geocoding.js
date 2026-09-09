import { PHOTON_API_URL, PHOTON_REVERSE_URL } from "../config/maps";

const formatPhotonFeature = (feature) => {
  const props = feature.properties;
  const parts = [props.name, props.street, props.city, props.state, props.country].filter(
    Boolean
  );
  return [...new Set(parts)].join(", ");
};

const formatCoordinateLabel = (lat, lng) =>
  `My Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

export const searchPlaces = async (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const response = await fetch(
    `${PHOTON_API_URL}/?q=${encodeURIComponent(query.trim())}&limit=6&lang=en`
  );

  if (!response.ok) {
    throw new Error("Address search failed. Check your internet connection.");
  }

  const data = await response.json();

  return data.features.map((feature) => ({
    label: formatPhotonFeature(feature),
    lat: feature.geometry.coordinates[1],
    lng: feature.geometry.coordinates[0],
  }));
};

export const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `${PHOTON_REVERSE_URL}?lon=${lng}&lat=${lat}&lang=en`
    );

    if (!response.ok) {
      return { label: formatCoordinateLabel(lat, lng), lat, lng };
    }

    const data = await response.json();
    const feature = data.features?.[0];

    if (!feature) {
      return { label: formatCoordinateLabel(lat, lng), lat, lng };
    }

    return {
      label: formatPhotonFeature(feature) || formatCoordinateLabel(lat, lng),
      lat,
      lng,
    };
  } catch {
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
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const place = await reverseGeocode(lat, lng);
        resolve(place);
      },
      () => reject(new Error("Could not access your location. Allow GPS permission."))
    );
  });

export const geocodeAddress = async (addressText) => {
  const results = await searchPlaces(addressText);
  if (results.length === 0) {
    throw new Error(`Could not find location: ${addressText}`);
  }
  return results[0];
};
