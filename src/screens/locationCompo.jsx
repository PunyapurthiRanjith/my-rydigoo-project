import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LIBRARIES = ["places"];

const LocationScreenComponent = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [calculatedPrices, setCalculatedPrices] = useState([]);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true); 

  const location = useLocation();
  const { address } = location.state || {};

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqHp7o26HqfYZuuUnuGheylzUaNQZvRzQ",
    libraries: LIBRARIES,
  });

  const transportationOptions = [
    { type: "Bike", ratePerKm: 5.1, ratePerMinute: 1, icon: "🏍" },
    { type: "Auto", ratePerKm: 9.3, ratePerMinute: 1.5, icon: "🛺" },
    { type: "Car", ratePerKm: 15.22, ratePerMinute: 2, icon: "🚗" },
  ];

  useEffect(() => {
    if (address && isLoaded) {
      fetchLocation();
    }
  }, [address, isLoaded]);

  const fetchLocation = async () => {
    if (!address?.fromAddress || !address?.destinationAddress) {
      return;
    }
    try {
      const directionService = new google.maps.DirectionsService();
      const result = await directionService.route({
        origin: address.fromAddress,
        destination: address.destinationAddress,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirections(result);
      const distText = result.routes[0].legs[0].distance.text;
      const durText = result.routes[0].legs[0].duration.text;

      setDistance(distText);
      setDuration(durText);

      const distanceKm = parseFloat(distText.split(" ")[0]);

      if (distanceKm > 100) {
        setIsServiceAvailable(false); 
        setCalculatedPrices([]);
      } else {
        setIsServiceAvailable(true); 
        calculatePrices(distText, durText, distanceKm); 
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  const calculatePrices = (distText, durText, distanceKm) => {
    const durationMinutes = parseInt(durText.split(" ")[0]);

    const prices = transportationOptions.map((option) => ({
      ...option,
      price:
        Math.floor(distanceKm * option.ratePerKm + durationMinutes * option.ratePerMinute),
    }));

    setCalculatedPrices(prices);
  };

  const clearRide = () => {
    setDirections(null);
    setDistance("");
    setDuration("");
    setCalculatedPrices([]);
    setIsServiceAvailable(true);
    console.log("Ride canceled");
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <div className="map-container w-full h-[50vh] md:h-[80vh]">
        <GoogleMap
          center={currentLocation || { lat: 17.3841, lng: 78.4564 }}
          zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{ streetViewControl: false }}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {currentLocation && <Marker position={currentLocation} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>

      <div className="w-full max-w-2xl text-center">
        <h1 className="text-xl font-semibold">Distance: {distance}</h1>
        <h1 className="text-xl font-semibold">Duration: {duration}</h1>
      </div>

      {/* Check if the service is available */}
      {!isServiceAvailable ? (
        <div className="text-red-500 text-xl font-semibold">
          Sorry, our service is not available for distances over 100 kilometers.
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Choose Your Ride</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {calculatedPrices.map((option) => (
              <div
                key={option.type}
                className="border rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <div className="text-4xl mb-2">{option.icon}</div>
                <h3 className="text-lg font-bold">{option.type}</h3>
                <p className="text-sm text-gray-600">
                  ₹{option.price.toFixed(2)}
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={() => console.log(`Selected: ${option.type}`)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <button
          onClick={clearRide}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default LocationScreenComponent;
