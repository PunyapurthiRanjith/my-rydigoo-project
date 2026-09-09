import { motion } from "framer-motion";
import { VEHICLE_TYPES } from "../utils/fareCalculator";

const VehicleSelector = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {Object.values(VEHICLE_TYPES).map((vehicle, index) => {
        const isSelected = selected === vehicle.id;
        return (
          <motion.button
            key={vehicle.id}
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(vehicle.id)}
            className={`rounded-2xl border-2 p-4 text-left transition-colors ${
              isSelected
                ? "border-teal-500 bg-teal-50 shadow-md ring-2 ring-teal-200"
                : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm"
            }`}
          >
            <div className="text-2xl">{vehicle.emoji}</div>
            <p className="mt-2 font-semibold text-gray-900">{vehicle.label}</p>
            <p className="mt-1 text-xs text-gray-500">{vehicle.description}</p>
            <p className="mt-2 text-sm font-medium text-teal-700">
              From {vehicle.minimumFare} · {vehicle.perKm}/km
            </p>
          </motion.button>
        );
      })}
    </div>
  );
};

export default VehicleSelector;
