import { useState } from "react";
import AddressAutocomplete from "./AddressAutocomplete";
import RideMap from "./RideMap";
import { geocodeAddress } from "../services/geocoding";
import { getRoute } from "../services/routing";

const GoogleMapComponent = () => {
  const [fromPlace, setFromPlace] = useState({ label: "", lat: null, lng: null });
  const [toPlace, setToPlace] = useState({ label: "", lat: null, lng: null });
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [fromPoint, setFromPoint] = useState(null);
  const [toPoint, setToPoint] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error("Error getting the location:", err)
    );
  };

  const confirmRide = async (event) => {
    event.preventDefault();
    setError("");

    if (!fromPlace.label || !toPlace.label) {
      setError("Please enter both pickup and destination.");
      return;
    }

    try {
      const from = fromPlace.lat
        ? fromPlace
        : await geocodeAddress(fromPlace.label);
      const to = toPlace.lat ? toPlace : await geocodeAddress(toPlace.label);

      setFromPoint(from);
      setToPoint(to);

      const route = await getRoute(from, to);
      setRouteCoordinates(route.coordinates);
      setDistance(route.distanceText);
      setDuration(route.durationText);
    } catch (err) {
      setError(err.message || "Could not calculate route.");
    }
  };

  const clearRide = (event) => {
    event.preventDefault();
    setFromPlace({ label: "", lat: null, lng: null });
    setToPlace({ label: "", lat: null, lng: null });
    setRouteCoordinates([]);
    setFromPoint(null);
    setToPoint(null);
    setDistance("");
    setDuration("");
    setError("");
  };

  return (
    <div className="flex flex-col flex-wrap md:flex-row">
      <div className="h-64 w-full md:h-auto md:w-1/2" style={{ minHeight: "50vh" }}>
        <RideMap
          routeCoordinates={routeCoordinates}
          from={fromPoint}
          to={toPoint}
          userLocation={userLocation}
        />
      </div>

      <div className="flex w-full flex-col justify-center border px-6 py-12 md:w-1/2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
            Start Your Journey
          </h2>
        </div>

        <form onSubmit={confirmRide} className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-900">
              From
            </label>
            <div className="mt-2">
              <AddressAutocomplete
                id="from"
                name="from"
                placeholder="Start from"
                value={fromPlace.label}
                onChange={(label) => setFromPlace({ label, lat: null, lng: null })}
                onSelect={(place) =>
                  setFromPlace({ label: place.label, lat: place.lat, lng: place.lng })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-900">
              To
            </label>
            <div className="mt-2">
              <AddressAutocomplete
                id="destination"
                name="destination"
                placeholder="Choose destination"
                value={toPlace.label}
                onChange={(label) => setToPlace({ label, lat: null, lng: null })}
                onSelect={(place) =>
                  setToPlace({ label: place.label, lat: place.lat, lng: place.lng })
                }
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Show Route
          </button>

          <button
            type="button"
            onClick={clearRide}
            className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-800 hover:bg-gray-300"
          >
            Clear Route
          </button>

          {distance && <p className="text-sm">Distance: {distance}</p>}
          {duration && <p className="text-sm">Duration: {duration}</p>}

          <button
            type="button"
            onClick={getUserLocation}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Use my location on map
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
