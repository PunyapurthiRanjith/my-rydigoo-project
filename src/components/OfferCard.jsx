import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { getOfferRestrictions } from "../utils/offers";

const OfferCard = ({ offer, isApplied, onApply, onRemove, disabled = false }) => {
  const restrictions = getOfferRestrictions(offer);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
        isApplied ? "border-teal-300 ring-2 ring-teal-100" : "border-gray-100"
      }`}
    >
      <div className={`bg-gradient-to-r ${offer.gradient} px-5 py-4 text-white`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-2xl backdrop-blur">
              {offer.icon}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                {offer.badge}
              </p>
              <h3 className="text-lg font-bold">{offer.title}</h3>
            </div>
          </div>
          {isApplied && (
            <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
              <CheckCircleIcon className="h-4 w-4" />
              Applied
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-600">{offer.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {restrictions.map((rule) => (
            <span
              key={rule}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600"
            >
              {rule}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-xs font-bold text-gray-800">
            {offer.code}
          </span>
        </div>

        <div className="mt-5">
          {isApplied ? (
            <button
              type="button"
              onClick={() => onRemove(offer.id)}
              className="btn-secondary w-full text-sm"
            >
              Remove offer
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onApply(offer.id)}
              disabled={disabled}
              className="btn-primary w-full text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save offer
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OfferCard;
