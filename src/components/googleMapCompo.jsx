import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const GoogleMapComponent = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [mapKey, setMapKey] = useState(1); 
  const fromRef = useRef();
  const destinationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqHp7o26HqfYZuuUnuGheylzUaNQZvRzQ",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, (error) => {
        console.error("Error getting the location:", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getCoordinates = (position) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentLocation(userLocation);
    map.panTo(userLocation);
    setZoom(20);
    map.setZoom(20);
  };

  const confirmRide = async () => {
    destinationRef.current.value
    if (fromRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: fromRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirections(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  };

  const clearRide = (e) => {
    e.preventDefault();
    setDistance("");
    setDuration("");
    setDirections(null);
    fromRef.current.value = "";
    destinationRef.current.value = "";
    setMapKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap">
        <div
          className="w-full md:w-1/2 h-64 md:h-auto"
          style={{ minHeight: "50vh" }}
        >
          <GoogleMap
            key={mapKey}  // Add a key to force remounting
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

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-8 border">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Start Your Journey
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmRide();
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="from"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  From:
                </label>
                <div className="mt-2">
                  <Autocomplete onPlaceChanged={() => fromRef.current.value}>
                    <input
                      placeholder="start from"
                      id="from"
                      name="from"
                      type="text"
                      required
                      ref={fromRef}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Autocomplete>
                </div>
              </div>

              <div>
                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    To:
                  </label>
                </div>
                <div className="mt-2">
                  <Autocomplete
                    onPlaceChanged={confirmRide}
                  >
                    <input
                      id="destination"
                      name="destination"
                      type="text"
                      placeholder="choose destination"
                      required
                      ref={destinationRef}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Autocomplete>
                </div>
              </div>

              <div>
                <button
                  onClick={clearRide}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"                                >
                  Clear Route
                </button>
                <h1>Distance: {distance}</h1>
                <h1>Duration: {duration}</h1>
              </div>
            </form>
          </div>
        </div> 
      </div>
    </>
  );
};

export default GoogleMapComponent;
