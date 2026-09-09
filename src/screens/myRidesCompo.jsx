import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AppHeader from "../components/AppHeader";
import { AnimatedPage } from "../components/AnimatedPage";
import { getRides } from "../utils/rides";
import { formatCurrency, VEHICLE_TYPES } from "../utils/fareCalculator";

const MyRidesScreen = () => {
  const rides = getRides();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <AppHeader />
      <AnimatedPage className="mx-auto max-w-3xl px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900">My Rides</h2>
        <p className="mt-1 text-sm text-gray-500">
          Rides booked this session (clears on browser reload)
        </p>

        {rides.length === 0 ? (
          <div className="mt-10 glass-card p-10 text-center">
            <div className="text-5xl">🛣️</div>
            <p className="mt-4 text-lg font-semibold text-gray-800">No rides yet</p>
            <p className="mt-2 text-sm text-gray-500">
              Book your first ride and it will appear here after payment.
            </p>
            <Link to="/app-interface" className="btn-primary mt-6 inline-block">
              Book a Ride
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {rides.map((ride, index) => (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="glass-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {VEHICLE_TYPES[ride.vehicleType]?.emoji || "🚗"}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {ride.fareDetails?.vehicleLabel || "Ride"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(ride.bookedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {ride.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium text-teal-700">A</span> {ride.from}</p>
                  <p><span className="font-medium text-indigo-700">B</span> {ride.to}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 border-t pt-4 text-sm">
                  <span>{ride.distance}</span>
                  <span>{ride.duration}</span>
                  <span className="font-bold text-teal-700">{formatCurrency(ride.fare)}</span>
                  {ride.fareDetails?.offerCode && ride.fareDetails?.discount > 0 && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      {ride.fareDetails.offerCode} −{formatCurrency(ride.fareDetails.discount)}
                    </span>
                  )}
                  <span className="text-gray-400">via {ride.paymentMethod?.toUpperCase()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatedPage>
    </div>
  );
};

export default MyRidesScreen;
