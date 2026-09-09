import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  getOfferRestrictions,
  OFFERS,
  previewOfferDiscount,
  validateOfferForRide,
} from "../utils/offers";
import { formatCurrency } from "../utils/fareCalculator";

const ApplyOfferModal = ({
  isOpen,
  onClose,
  vehicleType,
  fareTotal,
  distanceKm,
  appliedOfferId,
  onTryApply,
  onRemoveOffer,
}) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const rideContext = { vehicleType, fareTotal, distanceKm };

  const sortedOffers = [...OFFERS].sort((a, b) => {
    const aEligible = validateOfferForRide(a, rideContext).valid;
    const bEligible = validateOfferForRide(b, rideContext).valid;
    if (aEligible === bEligible) {
      return 0;
    }
    return aEligible ? -1 : 1;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label="Close offers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-offer-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h3 id="apply-offer-title" className="text-lg font-bold text-gray-900">
                  Apply an offer
                </h3>
                <p className="text-xs text-gray-500">
                  {distanceKm} km trip · fare {formatCurrency(fareTotal)}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4">
              {appliedOfferId && (
                <button
                  type="button"
                  onClick={() => {
                    onRemoveOffer();
                    onClose();
                  }}
                  className="mb-4 w-full rounded-xl border border-dashed border-gray-300 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Remove applied offer
                </button>
              )}

              <div className="space-y-3">
                {sortedOffers.map((offer) => {
                  const preview = previewOfferDiscount(
                    fareTotal,
                    offer,
                    vehicleType,
                    distanceKm
                  );
                  const isApplied = appliedOfferId === offer.id;
                  const isEligible = preview.eligible;
                  const restrictions = getOfferRestrictions(offer);

                  return (
                    <button
                      key={offer.id}
                      type="button"
                      onClick={() => onTryApply(offer.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isApplied
                          ? "border-teal-300 bg-teal-50 ring-2 ring-teal-100"
                          : isEligible
                            ? "border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50"
                            : "border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/40"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${offer.gradient} text-xl text-white shadow-sm`}
                        >
                          {offer.icon}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-bold text-gray-900">{offer.title}</p>
                              <p className="mt-0.5 font-mono text-xs font-semibold text-teal-700">
                                {offer.code}
                              </p>
                            </div>
                            {isApplied && (
                              <CheckCircleIcon className="h-6 w-6 shrink-0 text-teal-600" />
                            )}
                          </div>

                          <p className="mt-1.5 text-xs text-gray-600">{offer.description}</p>

                          <div className="mt-2 flex flex-wrap gap-1">
                            {restrictions.map((rule) => (
                              <span
                                key={rule}
                                className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600"
                              >
                                {rule}
                              </span>
                            ))}
                          </div>

                          <div className="mt-2">
                            {isEligible ? (
                              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                                Save {formatCurrency(preview.discount)} (max ₹{offer.maxDiscount})
                              </span>
                            ) : (
                              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                                {preview.reason}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-100 px-5 py-4">
              <button type="button" onClick={onClose} className="btn-secondary w-full">
                Continue without offer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplyOfferModal;
