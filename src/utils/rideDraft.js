const DRAFT_KEY = "rydigoo_ride_draft";

export const saveRideDraft = (draft) => {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};

export const getRideDraft = () => {
  const data = sessionStorage.getItem(DRAFT_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearRideDraft = () => {
  sessionStorage.removeItem(DRAFT_KEY);
};

export const buildDraftFromAddress = (address, fromPoint, toPoint) => ({
  fromPlace: {
    label: address.fromAddress,
    lat: address.fromCoords?.lat ?? fromPoint?.lat ?? null,
    lng: address.fromCoords?.lng ?? fromPoint?.lng ?? null,
  },
  toPlace: {
    label: address.destinationAddress,
    lat: address.toCoords?.lat ?? toPoint?.lat ?? null,
    lng: address.toCoords?.lng ?? toPoint?.lng ?? null,
  },
  vehicleType: address.vehicleType || "auto",
});
