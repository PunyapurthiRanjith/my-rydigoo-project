import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowPathIcon, ArrowsUpDownIcon, TicketIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import ApplyOfferModal from "../components/ApplyOfferModal";
import { AnimatedItem, AnimatedPage } from "../components/AnimatedPage";
import RideMap from "../components/RideMap";
import FareBreakdown from "../components/FareBreakdown";
import { geocodeAddress, getCurrentLocationPlace } from "../services/geocoding";
import { getRoute } from "../services/routing";
import { calculateFare, formatCurrency } from "../utils/fareCalculator";
import {
  applyOfferToFare,
  clearAppliedOffer,
  getAppliedOffer,
  tryApplyOffer,
} from "../utils/offers";
import { useToast } from "../hooks/useToast";
import { buildDraftFromAddress, saveRideDraft } from "../utils/rideDraft";

const LocationScreenComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [fromPoint, setFromPoint] = useState(null);
  const [toPoint, setToPoint] = useState(null);
  const [distance, setDistance] = useState("");
  const [distanceKm, setDistanceKm] = useState(0);
  const [duration, setDuration] = useState("");
  const [fareDetails, setFareDetails] = useState(null);
  const [appliedOffer, setAppliedOffer] = useState(() => getAppliedOffer());
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [routeError, setRouteError] = useState("");
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { address } = location.state || {};
  const vehicleType = address?.vehicleType || "auto";

  const baseFare = useMemo(() => {
    if (distanceKm <= 0) {
      return null;
    }
    return calculateFare(distanceKm, vehicleType);
  }, [distanceKm, vehicleType]);

  useEffect(() => {
    if (!address?.fromAddress || !address?.destinationAddress) {
      navigate("/app-interface", { replace: true });
    }
  }, [address, navigate]);

  const loadRoute = useCallback(async () => {
    if (!address?.fromAddress || !address?.destinationAddress) {
      return;
    }

    setIsLoadingRoute(true);
    setRouteError("");
    setRouteCoordinates([]);
    setDistance("");
    setDistanceKm(0);
    setDuration("");
    setFareDetails(null);

    try {
      let from = address.fromCoords?.lat
        ? { ...address.fromCoords, label: address.fromAddress }
        : await geocodeAddress(address.fromAddress);

      let to = address.toCoords?.lat
        ? { ...address.toCoords, label: address.destinationAddress }
        : await geocodeAddress(address.destinationAddress);

      if (!from.lat || !from.lng || !to.lat || !to.lng) {
        throw new Error("Invalid coordinates for route calculation.");
      }

      setFromPoint(from);
      setToPoint(to);

      const route = await getRoute(from, to);

      if (!route.coordinates?.length) {
        throw new Error("Route returned no map coordinates.");
      }

      setRouteCoordinates(route.coordinates);
      setDistance(route.distanceText);
      setDistanceKm(route.distanceKm);
      setDuration(route.durationText);
    } catch (error) {
      console.error("Error fetching route:", error);
      const message =
        error.message ||
        "Could not find a route. Try more specific addresses from the suggestions list.";
      setRouteError(message);
      toast.error(message);
    } finally {
      setIsLoadingRoute(false);
    }
  }, [address]);

  useEffect(() => {
    loadRoute();
  }, [loadRoute]);

  useEffect(() => {
    if (!baseFare) {
      setFareDetails(null);
      return;
    }
    setFareDetails(applyOfferToFare(baseFare, appliedOffer));
  }, [baseFare, appliedOffer]);

  const handleTryApplyOffer = (offerId) => {
    if (!baseFare) {
      return;
    }

    try {
      const offer = tryApplyOffer(offerId, {
        vehicleType,
        fareTotal: baseFare.grandTotal,
        distanceKm,
      });
      setAppliedOffer(offer);
      setShowOfferModal(false);
      toast.success(`${offer.code} applied — fare updated!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveOffer = () => {
    clearAppliedOffer();
    setAppliedOffer(null);
    toast.info("Offer removed.");
  };

  const getUserLocation = async () => {
    setIsLocating(true);
    try {
      const place = await getCurrentLocationPlace();
      setUserLocation({ lat: place.lat, lng: place.lng, label: place.label });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLocating(false);
    }
  };

  const changeRoute = () => {
    const draft = buildDraftFromAddress(address, fromPoint, toPoint);
    saveRideDraft(draft);
    navigate("/app-interface", { state: { draft } });
  };

  const swapAndReload = () => {
    const swappedAddress = {
      fromAddress: address.destinationAddress,
      destinationAddress: address.fromAddress,
      fromCoords: address.toCoords,
      toCoords: address.fromCoords,
      vehicleType,
    };

    const draft = buildDraftFromAddress(swappedAddress, toPoint, fromPoint);
    saveRideDraft(draft);

    navigate("/locationRoute-page", {
      state: { address: swappedAddress },
      replace: true,
    });
  };

  const bookRide = () => {
    if (!distance || !duration || !fareDetails) {
      const message = "Please wait for the route and fare to load before booking.";
      setRouteError(message);
      toast.warning(message);
      return;
    }

    navigate("/payment-page", {
      state: {
        ride: {
          from: address.fromAddress,
          to: address.destinationAddress,
          distance,
          duration,
          vehicleType,
          fare: fareDetails.grandTotal,
          fareDetails,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <AnimatedPage className="grid min-h-[calc(100vh-65px)] grid-cols-1 lg:grid-cols-2">
        <div className="relative h-80 p-4 sm:p-5 lg:h-auto lg:p-6" style={{ minHeight: "50vh" }}>
          <RideMap
            className="shadow-lg ring-1 ring-gray-200"
            routeCoordinates={routeCoordinates}
            from={fromPoint}
            to={toPoint}
            userLocation={userLocation}
          />
          {isLoadingRoute && (
            <div className="absolute inset-4 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm lg:inset-6">
              <p className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-lg">
                Calculating best route...
              </p>
            </div>
          )}
        </div>

        <AnimatedItem className="space-y-6 overflow-y-auto p-6 lg:p-8" delay={0.1}>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Trip Details</h2>
            <p className="mt-1 text-sm text-gray-500">Review your route and fare before booking</p>
          </div>

          <div className="glass-card p-5 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                A
              </span>
              <p><span className="font-semibold">From:</span> {address?.fromAddress}</p>
            </div>
            <div className="my-3 ml-2.5 h-6 border-l-2 border-dashed border-gray-300" />
            <div className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                B
              </span>
              <p><span className="font-semibold">To:</span> {address?.destinationAddress}</p>
            </div>
          </div>

          {routeError && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
              <p>{routeError}</p>
              <button
                type="button"
                onClick={loadRoute}
                className="mt-3 flex items-center gap-1.5 font-semibold text-red-700 hover:text-red-800"
              >
                <ArrowPathIcon className="h-4 w-4" />
                Retry route
              </button>
            </div>
          )}

          {distance && !routeError && (
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-wide text-gray-400">Distance</p>
                <p className="mt-1 text-xl font-bold text-gray-900">{distance}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-wide text-gray-400">Duration</p>
                <p className="mt-1 text-xl font-bold text-gray-900">{duration}</p>
              </div>
            </div>
          )}

          {fareDetails && !routeError && (
            <div className="space-y-3">
              <FareBreakdown fare={fareDetails} />

              <button
                type="button"
                onClick={() => setShowOfferModal(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 px-4 py-3 text-sm font-semibold text-teal-800 transition hover:border-teal-400 hover:bg-teal-50"
              >
                <TicketIcon className="h-5 w-5" />
                {appliedOffer && fareDetails.discount > 0
                  ? `Offer applied · ${fareDetails.offerCode} (−${formatCurrency(fareDetails.discount)}) · Change`
                  : "Apply Offer"}
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={getUserLocation} disabled={isLocating} className="btn-secondary">
              {isLocating ? "Locating..." : "📍 My Location"}
            </button>
            <button
              type="button"
              onClick={swapAndReload}
              disabled={isLoadingRoute}
              title="Swap pickup and drop"
              aria-label="Swap pickup and drop locations"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-200 bg-white text-teal-600 shadow-sm transition hover:border-teal-400 hover:bg-teal-50 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowsUpDownIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={changeRoute} className="btn-secondary">
              Change Route
            </button>
            <button
              type="button"
              onClick={bookRide}
              disabled={!distance || isLoadingRoute || Boolean(routeError)}
              className="btn-primary flex-1 sm:flex-none"
            >
              Book for ₹{fareDetails?.grandTotal ?? "—"}
            </button>
          </div>

          <p className="text-xs text-gray-400">
            Map © OpenStreetMap · Routing via OSRM · Fares are estimates for this MVP demo
          </p>
        </AnimatedItem>
      </AnimatedPage>

      {baseFare && (
        <ApplyOfferModal
          isOpen={showOfferModal}
          onClose={() => setShowOfferModal(false)}
          vehicleType={vehicleType}
          fareTotal={baseFare.grandTotal}
          distanceKm={distanceKm}
          appliedOfferId={appliedOffer?.id}
          onTryApply={handleTryApplyOffer}
          onRemoveOffer={handleRemoveOffer}
        />
      )}
    </div>
  );
};

export default LocationScreenComponent;
