import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import OfferCard from "../components/OfferCard";
import { AnimatedItem, AnimatedPage } from "../components/AnimatedPage";
import { useToast } from "../hooks/useToast";
import {
  applyOffer,
  clearAppliedOffer,
  getAppliedOffer,
  OFFERS,
} from "../utils/offers";

const FILTER_TABS = [
  { id: "all", label: "All offers", icon: "✨" },
  { id: "new", label: "New user", icon: "🎉" },
  { id: "bike", label: "Bike", icon: "🏍️" },
  { id: "auto", label: "Auto", icon: "🛺" },
  { id: "car", label: "Car", icon: "🚗" },
];

const OffersScreen = () => {
  const toast = useToast();
  const [activeFilter, setActiveFilter] = useState("all");
  const [appliedOffer, setAppliedOfferState] = useState(() => getAppliedOffer());

  const filteredOffers = useMemo(() => {
    if (activeFilter === "all") {
      return OFFERS;
    }
    return OFFERS.filter((offer) => offer.category === activeFilter);
  }, [activeFilter]);

  const handleApply = (offerId) => {
    try {
      const offer = applyOffer(offerId);
      setAppliedOfferState(offer);
      toast.success(`${offer.code} saved! Apply it on the fare screen when booking.`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemove = () => {
    clearAppliedOffer();
    setAppliedOfferState(null);
    toast.info("Offer removed.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-teal-50/30">
      <AppHeader />
      <AnimatedPage className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Offers &amp; Deals</h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse deals here — apply them on the route &amp; fare screen before booking
            </p>
          </div>
          <Link to="/app-interface" className="btn-primary text-sm">
            Book a ride
          </Link>
        </div>

        {appliedOffer && (
          <AnimatedItem className="mt-6">
            <div className="rounded-2xl border border-teal-200 bg-teal-50/80 p-4">
              <p className="text-sm font-semibold text-teal-900">
                Active offer: {appliedOffer.icon} {appliedOffer.title} ({appliedOffer.code})
              </p>
              <p className="mt-1 text-xs text-teal-700">
                Saved for this session — use &quot;Apply Offer&quot; on the fare screen to confirm.
              </p>
            </div>
          </AnimatedItem>
        )}

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === tab.id
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {filteredOffers.length === 0 ? (
          <div className="mt-10 glass-card p-10 text-center">
            <p className="text-4xl">🏷️</p>
            <p className="mt-3 font-semibold text-gray-800">No offers in this category</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOffers.map((offer, index) => (
              <AnimatedItem key={offer.id} delay={index * 0.05}>
                <OfferCard
                  offer={offer}
                  isApplied={appliedOffer?.id === offer.id}
                  onApply={handleApply}
                  onRemove={handleRemove}
                />
              </AnimatedItem>
            ))}
          </div>
        )}
      </AnimatedPage>
    </div>
  );
};

export default OffersScreen;
