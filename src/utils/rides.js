const RIDES_KEY = "rydigoo_rides";

export const getRides = () => {
  const data = sessionStorage.getItem(RIDES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRide = (ride) => {
  const rides = getRides();
  const newRide = {
    id: `ride-${Date.now()}`,
    status: "completed",
    bookedAt: new Date().toISOString(),
    ...ride,
  };
  sessionStorage.setItem(RIDES_KEY, JSON.stringify([newRide, ...rides]));
  return newRide;
};

export const getRideStats = () => {
  const rides = getRides();
  const totalSpent = rides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
  return {
    totalRides: rides.length,
    totalSpent,
  };
};
