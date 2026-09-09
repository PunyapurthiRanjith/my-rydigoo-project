export const VEHICLE_TYPES = {
  bike: {
    id: "bike",
    label: "Bike",
    emoji: "🏍️",
    baseFare: 25,
    perKm: 8,
    minimumFare: 40,
    description: "Quick & affordable for solo rides",
  },
  auto: {
    id: "auto",
    label: "Auto",
    emoji: "🛺",
    baseFare: 35,
    perKm: 12,
    minimumFare: 60,
    description: "Best for short city trips",
  },
  car: {
    id: "car",
    label: "Car / Taxi",
    emoji: "🚗",
    baseFare: 50,
    perKm: 18,
    minimumFare: 100,
    description: "Comfortable AC rides",
  },
};

export const parseDistanceKm = (distanceText) => {
  const kmMatch = String(distanceText).match(/([\d.]+)\s*km/i);
  return kmMatch ? parseFloat(kmMatch[1]) : 0;
};

export const calculateFare = (distanceKm, vehicleType = "auto") => {
  const vehicle = VEHICLE_TYPES[vehicleType] || VEHICLE_TYPES.auto;
  const distanceCharge = Math.round(distanceKm * vehicle.perKm);
  const subtotal = vehicle.baseFare + distanceCharge;
  const total = Math.max(vehicle.minimumFare, subtotal);
  const gst = Math.round(total * 0.05);
  const grandTotal = total + gst;

  return {
    vehicleType: vehicle.id,
    vehicleLabel: vehicle.label,
    distanceKm: Number(distanceKm.toFixed(1)),
    baseFare: vehicle.baseFare,
    perKmRate: vehicle.perKm,
    distanceCharge,
    subtotal,
    minimumFare: vehicle.minimumFare,
    total,
    gst,
    grandTotal,
  };
};

export const formatCurrency = (amount) => `₹${amount}`;
