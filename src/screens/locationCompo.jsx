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
  const [mapKey, setMapKey] = useState(1);

  const location = useLocation();
  const { address } = location.state || {};

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqHp7o26HqfYZuuUnuGheylzUaNQZvRzQ",
    libraries: LIBRARIES,
  });

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
      setDistance(result.routes[0].legs[0].distance.text);
      setDuration(result.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  const clearRide = () => {
    setDirections(null);
    setDistance("");
    setDuration("");
    console.log("Ride canceled");
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="map-container w-full h-[50vh] md:h-[80vh] md:w-full">
        <GoogleMap
          key={mapKey}
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
      <h1>Distance: {distance}</h1>
      <h1>Duration: {duration}</h1>

      <div>
        <button onClick={clearRide}>Cancel Ride</button>
      </div>
    </>
  );
};

export default LocationScreenComponent;
