import { VEHICLE_TYPES } from "./fareCalculator";
import { getRides } from "./rides";

const APPLIED_OFFER_KEY = "rydigoo_applied_offer";

export const OFFERS = [
  {
    id: "welcome100",
    code: "WELCOME100",
    title: "Welcome to Rydigoo",
    description: "₹30 off on your first ride within city limits.",
    discountType: "flat",
    discountValue: 30,
    maxDiscount: 30,
    minFare: 35,
    minDistanceKm: 2,
    maxDistanceKm: 25,
    vehicleTypes: ["bike", "auto", "car"],
    firstRideOnly: true,
    category: "new",
    icon: "🎉",
    gradient: "from-amber-400 to-orange-500",
    badge: "New user",
  },
  {
    id: "rydigoo20",
    code: "RYDIGOO20",
    title: "20% Off Ride",
    description: "Save 20% on rides between 3–40 km.",
    discountType: "percent",
    discountValue: 20,
    maxDiscount: 35,
    minFare: 35,
    minDistanceKm: 3,
    maxDistanceKm: 40,
    vehicleTypes: ["bike", "auto", "car"],
    category: "all",
    icon: "🏷️",
    gradient: "from-teal-500 to-emerald-500",
    badge: "Popular",
  },
  {
    id: "flat50",
    code: "FLAT50",
    title: "Flat ₹25 Off",
    description: "₹25 off on medium trips from 5–30 km.",
    discountType: "flat",
    discountValue: 25,
    maxDiscount: 25,
    minFare: 55,
    minDistanceKm: 5,
    maxDistanceKm: 30,
    vehicleTypes: ["bike", "auto", "car"],
    category: "all",
    icon: "💰",
    gradient: "from-indigo-500 to-violet-500",
    badge: "Limited",
  },
  {
    id: "bike15",
    code: "BIKE15",
    title: "Bike Special",
    description: "15% off on bike rides up to 12 km.",
    discountType: "percent",
    discountValue: 15,
    maxDiscount: 20,
    minFare: 25,
    minDistanceKm: 1,
    maxDistanceKm: 12,
    vehicleTypes: ["bike"],
    category: "bike",
    icon: "🏍️",
    gradient: "from-cyan-500 to-teal-600",
    badge: "Bike only",
  },
  {
    id: "auto25",
    code: "AUTO25",
    title: "Auto Saver",
    description: "₹12 off on auto rides between 2–20 km.",
    discountType: "flat",
    discountValue: 12,
    maxDiscount: 12,
    minFare: 40,
    minDistanceKm: 2,
    maxDistanceKm: 20,
    vehicleTypes: ["auto"],
    category: "auto",
    icon: "🛺",
    gradient: "from-lime-500 to-green-600",
    badge: "Auto only",
  },
  {
    id: "car100",
    code: "CAR100",
    title: "Premium Car Deal",
    description: "₹40 off on car rides above 8 km (max 50 km).",
    discountType: "flat",
    discountValue: 40,
    maxDiscount: 40,
    minFare: 85,
    minDistanceKm: 8,
    maxDistanceKm: 50,
    vehicleTypes: ["car"],
    category: "car",
    icon: "🚗",
    gradient: "from-slate-600 to-indigo-700",
    badge: "Car only",
  },
  {
    id: "weekend30",
    code: "WEEKEND30",
    title: "Weekend Flash",
    description: "30% off on auto & car trips from 5–35 km.",
    discountType: "percent",
    discountValue: 30,
    maxDiscount: 45,
    minFare: 55,
    minDistanceKm: 5,
    maxDistanceKm: 35,
    vehicleTypes: ["auto", "car"],
    category: "all",
    icon: "⚡",
    gradient: "from-rose-500 to-pink-600",
    badge: "Weekend",
  },
];

const formatVehicleLabel = (type) => VEHICLE_TYPES[type]?.label || type;

export const getOfferById = (id) => OFFERS.find((offer) => offer.id === id);

export const getOfferByCode = (code) =>
  OFFERS.find((offer) => offer.code.toUpperCase() === code.toUpperCase());

export const getAppliedOffer = () => {
  const data = sessionStorage.getItem(APPLIED_OFFER_KEY);
  if (!data) {
    return null;
  }
  const parsed = JSON.parse(data);
  return getOfferById(parsed.id) || null;
};

export const applyOffer = (offerId) => {
  const offer = getOfferById(offerId);
  if (!offer) {
    throw new Error("Offer not found.");
  }
  sessionStorage.setItem(APPLIED_OFFER_KEY, JSON.stringify({ id: offer.id }));
  return offer;
};

export const tryApplyOffer = (offerId, rideContext) => {
  const offer = getOfferById(offerId);
  if (!offer) {
    throw new Error("Offer not found.");
  }

  const validation = validateOfferForRide(offer, rideContext);
  if (!validation.valid) {
    throw new Error(validation.reason);
  }

  sessionStorage.setItem(APPLIED_OFFER_KEY, JSON.stringify({ id: offer.id }));
  return offer;
};

export const clearAppliedOffer = () => {
  sessionStorage.removeItem(APPLIED_OFFER_KEY);
};

export const getOfferRestrictions = (offer) => {
  if (!offer) {
    return [];
  }

  const restrictions = [];

  restrictions.push(
    offer.vehicleTypes.length === 3
      ? "All vehicles"
      : offer.vehicleTypes.map(formatVehicleLabel).join(", ")
  );

  if (offer.minDistanceKm != null || offer.maxDistanceKm != null) {
    if (offer.minDistanceKm != null && offer.maxDistanceKm != null) {
      restrictions.push(`${offer.minDistanceKm}–${offer.maxDistanceKm} km`);
    } else if (offer.minDistanceKm != null) {
      restrictions.push(`Min ${offer.minDistanceKm} km`);
    } else {
      restrictions.push(`Up to ${offer.maxDistanceKm} km`);
    }
  }

  restrictions.push(`Min fare ₹${offer.minFare}`);

  if (offer.discountType === "percent") {
    restrictions.push(`${offer.discountValue}% off · max ₹${offer.maxDiscount}`);
  } else {
    restrictions.push(`Flat ₹${offer.discountValue} · max ₹${offer.maxDiscount}`);
  }

  if (offer.firstRideOnly) {
    restrictions.push("First ride only");
  }

  return restrictions;
};

export const validateOfferForRide = (offer, { vehicleType, fareTotal, distanceKm = 0 }) => {
  if (!offer) {
    return { valid: false, reason: "No offer selected." };
  }

  if (!offer.vehicleTypes.includes(vehicleType)) {
    const labels = offer.vehicleTypes.map(formatVehicleLabel).join(", ");
    const current = formatVehicleLabel(vehicleType);
    return {
      valid: false,
      reason: `${offer.code} cannot be applied to ${current} rides. Valid only for ${labels}.`,
    };
  }

  if (offer.firstRideOnly && getRides().length > 0) {
    return { valid: false, reason: "First ride only." };
  }

  if (offer.minDistanceKm != null && distanceKm < offer.minDistanceKm) {
    return {
      valid: false,
      reason: `Minimum trip distance is ${offer.minDistanceKm} km.`,
    };
  }

  if (offer.maxDistanceKm != null && distanceKm > offer.maxDistanceKm) {
    return {
      valid: false,
      reason: `Valid only up to ${offer.maxDistanceKm} km.`,
    };
  }

  if (fareTotal < offer.minFare) {
    return {
      valid: false,
      reason: `Minimum fare ₹${offer.minFare} required.`,
    };
  }

  return { valid: true };
};

export const calculateDiscount = (fareTotal, offer) => {
  if (!offer || !fareTotal) {
    return 0;
  }

  let discount = 0;

  if (offer.discountType === "percent") {
    discount = Math.round((fareTotal * offer.discountValue) / 100);
  } else {
    discount = offer.discountValue;
  }

  if (offer.maxDiscount != null) {
    discount = Math.min(discount, offer.maxDiscount);
  }

  return Math.min(discount, Math.max(fareTotal - 1, 0));
};

export const previewOfferDiscount = (fareTotal, offer, vehicleType, distanceKm = 0) => {
  const validation = validateOfferForRide(offer, { vehicleType, fareTotal, distanceKm });

  if (!validation.valid) {
    return { eligible: false, reason: validation.reason, discount: 0 };
  }

  return {
    eligible: true,
    reason: null,
    discount: calculateDiscount(fareTotal, offer),
  };
};

export const applyOfferToFare = (fare, offer) => {
  if (!fare) {
    return null;
  }

  const baseFare = { ...fare, originalGrandTotal: fare.grandTotal };

  if (!offer) {
    return {
      ...baseFare,
      discount: 0,
      offerCode: null,
      offerTitle: null,
    };
  }

  const validation = validateOfferForRide(offer, {
    vehicleType: fare.vehicleType,
    fareTotal: fare.grandTotal,
    distanceKm: fare.distanceKm,
  });

  if (!validation.valid) {
    return {
      ...baseFare,
      discount: 0,
      offerCode: offer.code,
      offerTitle: offer.title,
      offerInvalidReason: validation.reason,
    };
  }

  const discount = calculateDiscount(fare.grandTotal, offer);

  return {
    ...baseFare,
    discount,
    offerCode: offer.code,
    offerTitle: offer.title,
    offerInvalidReason: null,
    grandTotal: fare.grandTotal - discount,
  };
};
