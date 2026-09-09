import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { clearAppliedOffer, getAppliedOffer } from "../utils/offers";

const AppliedOfferBanner = ({ onRemoved, compact = false }) => {
  const offer = getAppliedOffer();

  if (!offer) {
    return null;
  }

  const handleRemove = () => {
    clearAppliedOffer();
    onRemoved?.();
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-xl bg-teal-50 px-3 py-2 text-xs ring-1 ring-teal-100">
        <span className="font-medium text-teal-800">
          {offer.icon} {offer.code} applied
        </span>
        <button
          type="button"
          onClick={handleRemove}
          className="text-teal-600 hover:text-teal-800"
          aria-label="Remove offer"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-teal-50 to-indigo-50 px-4 py-3 ring-1 ring-teal-100">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{offer.icon}</span>
        <div>
          <p className="text-sm font-semibold text-teal-900">{offer.title}</p>
          <p className="text-xs text-teal-700">
            Code <span className="font-mono font-bold">{offer.code}</span> will apply at checkout
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/offers" className="text-xs font-semibold text-indigo-700 hover:underline">
          Change
        </Link>
        <button
          type="button"
          onClick={handleRemove}
          className="rounded-lg p-1 text-gray-500 hover:bg-white hover:text-gray-800"
          aria-label="Remove offer"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AppliedOfferBanner;
