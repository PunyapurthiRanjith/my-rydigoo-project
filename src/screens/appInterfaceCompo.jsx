import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import BookRideHeroStack from "../components/BookRideHeroStack";
import LocationFieldsGroup from "../components/LocationFieldsGroup";
import VehicleSelector from "../components/VehicleSelector";
import { AnimatedItem, AnimatedPage } from "../components/AnimatedPage";
import { geocodeAddress, getCurrentLocationPlace } from "../services/geocoding";
import { useToast } from "../hooks/useToast";
import { getRideDraft, saveRideDraft } from "../utils/rideDraft";
import {
  hasBlockingLocationErrors,
  validateLocationFields,
} from "../utils/locationValidation";

const emptyPlace = () => ({ label: "", lat: null, lng: null });

const AppInterfaceComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const incomingDraft = location.state?.draft || getRideDraft();

  const [fromPlace, setFromPlace] = useState(incomingDraft?.fromPlace || emptyPlace());
  const [toPlace, setToPlace] = useState(incomingDraft?.toPlace || emptyPlace());
  const [vehicleType, setVehicleType] = useState(incomingDraft?.vehicleType || "auto");
  const [touched, setTouched] = useState({ from: false, to: false, submitted: false });
  const [routeError, setRouteError] = useState("");
  const [gpsError, setGpsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocatingFrom, setIsLocatingFrom] = useState(false);

  const formErrors = useMemo(
    () =>
      validateLocationFields(fromPlace, toPlace, {
        fromTouched: touched.from,
        toTouched: touched.to,
        submitted: touched.submitted,
      }),
    [fromPlace, toPlace, touched]
  );

  useEffect(() => {
    if (fromPlace.label || toPlace.label) {
      saveRideDraft({ fromPlace, toPlace, vehicleType });
    }
  }, [fromPlace, toPlace, vehicleType]);

  const handleFromChange = (label) => {
    setFromPlace({ label, lat: null, lng: null });
    setRouteError("");
    setGpsError("");
    setTouched((prev) => ({ ...prev, from: true }));
  };

  const handleToChange = (label) => {
    setToPlace({ label, lat: null, lng: null });
    setRouteError("");
    setTouched((prev) => ({ ...prev, to: true }));
  };

  const handleFromSelect = (place) => {
    setFromPlace({ label: place.label, lat: place.lat, lng: place.lng });
    setRouteError("");
    setGpsError("");
    setTouched((prev) => ({ ...prev, from: true }));
  };

  const handleToSelect = (place) => {
    setToPlace({ label: place.label, lat: place.lat, lng: place.lng });
    setRouteError("");
    setTouched((prev) => ({ ...prev, to: true }));
  };

  const handleMyLocationForFrom = async () => {
    setIsLocatingFrom(true);
    setRouteError("");
    setGpsError("");
    setTouched((prev) => ({ ...prev, from: true }));
    try {
      const place = await getCurrentLocationPlace();
      setFromPlace({ label: place.label, lat: place.lat, lng: place.lng });
      toast.success("Pickup set to your current location.");
    } catch (error) {
      const message = error.message || "Could not get your location.";
      setGpsError(message);
      toast.error(message);
    } finally {
      setIsLocatingFrom(false);
    }
  };

  const handleSwapLocations = () => {
    setFromPlace(toPlace);
    setToPlace(fromPlace);
    setRouteError("");
    setGpsError("");
    setTouched({ from: true, to: true, submitted: false });
  };

  const confirmRide = async (event) => {
    event.preventDefault();
    setTouched({ from: true, to: true, submitted: true });
    setRouteError("");

    const errors = validateLocationFields(fromPlace, toPlace, {
      fromTouched: true,
      toTouched: true,
      submitted: true,
    });

    if (hasBlockingLocationErrors(errors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      let from = fromPlace;
      let to = toPlace;

      if (!from.lat || !from.lng) {
        from = await geocodeAddress(from.label);
      }
      if (!to.lat || !to.lng) {
        to = await geocodeAddress(to.label);
      }

      const draft = {
        fromPlace: { label: from.label, lat: from.lat, lng: from.lng },
        toPlace: { label: to.label, lat: to.lat, lng: to.lng },
        vehicleType,
      };
      saveRideDraft(draft);

      navigate("/locationRoute-page", {
        state: {
          address: {
            fromAddress: from.label,
            destinationAddress: to.label,
            fromCoords: { lat: from.lat, lng: from.lng },
            toCoords: { lat: to.lat, lng: to.lng },
            vehicleType,
          },
        },
      });
    } catch (error) {
      const message = error.message || "Could not resolve one of the addresses.";
      setRouteError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white">
      <AppHeader />
      <AnimatedPage className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl grid-cols-1 items-stretch gap-8 px-6 py-8 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-10">
        <AnimatedItem className="glass-card overflow-visible p-8 lg:flex lg:flex-col lg:justify-center">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Ride</h2>
          <p className="mt-2 text-sm text-gray-500">
            Pick locations in India from suggestions, swap if needed, then view route and fare.
          </p>
          <p className="mt-1 text-xs font-medium text-teal-700">
            Service area: India only
          </p>

          <form onSubmit={confirmRide} className="relative mt-8 space-y-8 overflow-visible" noValidate>
            <AnimatedItem delay={0.1}>
              <label className="mb-3 block text-sm font-semibold text-gray-900">
                Select ride type
              </label>
              <VehicleSelector selected={vehicleType} onSelect={setVehicleType} />
            </AnimatedItem>

            <LocationFieldsGroup
              fromPlace={fromPlace}
              toPlace={toPlace}
              onFromChange={handleFromChange}
              onToChange={handleToChange}
              onFromSelect={handleFromSelect}
              onToSelect={handleToSelect}
              onFromBlur={() => setTouched((prev) => ({ ...prev, from: true }))}
              onToBlur={() => setTouched((prev) => ({ ...prev, to: true }))}
              onSwap={handleSwapLocations}
              fromError={isLocatingFrom ? "" : gpsError || formErrors.fromError}
              toError={formErrors.destinationError}
              showMyLocation
              onMyLocation={handleMyLocationForFrom}
              isLocatingFrom={isLocatingFrom}
            />

            {routeError && (
              <div className="animate-fade-in rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {routeError}
              </div>
            )}

            <AnimatedItem delay={0.25}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Finding locations..." : "See Route & Fare"}
              </button>
            </AnimatedItem>
          </form>
        </AnimatedItem>

        <AnimatedItem delay={0.15} className="relative min-h-[360px] w-full lg:min-h-0 lg:h-full">
          <BookRideHeroStack />
        </AnimatedItem>
      </AnimatedPage>
    </div>
  );
};

export default AppInterfaceComponent;
