// Optional: free key from https://openrouteservice.org/dev/#/signup (no credit card)
// If empty, the app uses OSRM + Photon which need no key.
export const OPENROUTESERVICE_API_KEY =
  import.meta.env.VITE_OPENROUTESERVICE_API_KEY || "";

export const PHOTON_API_URL = "https://photon.komoot.io/api";
export const PHOTON_REVERSE_URL = "https://photon.komoot.io/reverse";
export const OSRM_API_URL = "https://router.project-osrm.org/route/v1/driving";

export const DEFAULT_MAP_CENTER = [17.3841, 78.4564]; // Hyderabad
