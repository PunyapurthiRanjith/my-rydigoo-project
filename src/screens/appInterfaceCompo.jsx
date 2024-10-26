import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import appInterfaceImage from "../assets/app-interface-image.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
const LIBRARIES = ["places"];

const AppInterfaceComponent = () => {
  const fromRef = useRef();
  const destinationRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const [address, setAddress] = useState({
    fromAddress: "",
    destinationAddress: "",
  });

  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqHp7o26HqfYZuuUnuGheylzUaNQZvRzQ",
    libraries:LIBRARIES,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const confirmRide = async (e) => {
    e.preventDefault();

    const fromEntered = fromRef.current.value;
    const destinationEntered = destinationRef.current.value;

    const validatedErrors = validations(fromEntered, destinationEntered);
    
    if (Object.keys(validatedErrors).length > 0) {
      setFormErrors(validatedErrors);
    } else {
      const newAddress = { fromAddress: fromEntered, destinationAddress: destinationEntered };
      setAddress(newAddress);
      navigate("/locationRoute-page", { state: { address: newAddress } });
    }
  };

  const validations = (from, destination) => {
    let errors = {};
    if (!from) {
      errors.fromError = "Please enter your location";
    }
    if (!destination) {
      errors.destinationError = "Please enter your destination";
    }
    return errors;
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:justify-evenly lg:px-20 space-y-8 lg:space-y-0 lg:space-x-10 border">
        <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Let's start a Ride...
          </h2>

          <div className="mt-10">
            <form onSubmit={confirmRide} className="space-y-6">
              <div>
                <label
                  htmlFor="from"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  FROM:
                </label>
                <div className="mt-2">
                  <Autocomplete onPlaceChanged={() => {}}>
                    <input
                      placeholder="Start from"
                      id="from"
                      name="from"
                      type="text"
                      ref={fromRef}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Autocomplete>
                  {formErrors.fromError && <span className="text-red-500">{formErrors.fromAdd}</span>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    TO:
                  </label>
                </div>
                <div className="mt-2">
                  <Autocomplete onPlaceChanged={() => {}}>
                    <input
                      id="destination"
                      name="destination"
                      type="text"
                      placeholder="Choose destination"
                      ref={destinationRef}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Autocomplete>
                  {formErrors.destinationError && <span className="text-red-500">{formErrors.destinationAdd}</span>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Confirm Location
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0 lg:max-w-md xl:max-w-lg border">
          <img
            src={appInterfaceImage}
            alt="App Interface"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default AppInterfaceComponent;
