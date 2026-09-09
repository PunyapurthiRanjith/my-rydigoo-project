import { OPENROUTESERVICE_API_KEY, OSRM_API_URL } from "../config/maps";

const formatDuration = (seconds) => {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
};

const normalizeRoute = (distanceMeters, durationSeconds, coordinates) => ({
  distanceKm: Number((distanceMeters / 1000).toFixed(1)),
  distanceText: `${(distanceMeters / 1000).toFixed(1)} km`,
  durationMinutes: Math.round(durationSeconds / 60),
  durationText: formatDuration(durationSeconds),
  coordinates,
});

const getRouteFromOsrm = async (from, to) => {
  const url = `${OSRM_API_URL}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Routing service unavailable.");
  }

  const data = await response.json();
  if (data.code !== "Ok" || !data.routes?.length) {
    throw new Error("Could not find a driving route for these locations.");
  }

  const route = data.routes[0];
  const coordinates = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

  return normalizeRoute(route.distance, route.duration, coordinates);
};

const getRouteFromOpenRouteService = async (from, to) => {
  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    {
      method: "POST",
      headers: {
        Authorization: OPENROUTESERVICE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [from.lng, from.lat],
          [to.lng, to.lat],
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("OpenRouteService request failed.");
  }

  const data = await response.json();
  const feature = data.features?.[0];

  if (!feature) {
    throw new Error("Could not find a driving route for these locations.");
  }

  const coordinates = feature.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
  const { distance, duration } = feature.properties.summary;

  return normalizeRoute(distance, duration, coordinates);
};

const validateCoords = (point, label) => {
  if (!point?.lat || !point?.lng || Number.isNaN(Number(point.lat)) || Number.isNaN(Number(point.lng))) {
    throw new Error(`Invalid coordinates for ${label}. Please re-select the address.`);
  }
};

export const getRoute = async (from, to) => {
  validateCoords(from, "pickup");
  validateCoords(to, "drop");

  if (OPENROUTESERVICE_API_KEY) {
    try {
      return await getRouteFromOpenRouteService(from, to);
    } catch (error) {
      console.warn("OpenRouteService failed, falling back to OSRM.", error);
    }
  }

  return getRouteFromOsrm(from, to);
};
