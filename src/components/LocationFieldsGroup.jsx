import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import AddressInput from "./AddressInput";

const LocationFieldsGroup = ({
  fromPlace,
  toPlace,
  onFromChange,
  onToChange,
  onFromSelect,
  onToSelect,
  onFromBlur,
  onToBlur,
  onSwap,
  fromError,
  toError,
  showMyLocation,
  onMyLocation,
  isLocatingFrom,
}) => {
  const canSwap = fromPlace.label.trim() || toPlace.label.trim();

  return (
    <div className="relative overflow-visible pr-12">
      <div className="relative z-30 overflow-visible">
        <AddressInput
          id="from"
          name="from"
          type="pickup"
          label="Pickup location"
          placeholder="Search pickup in India or use my location"
          value={fromPlace.label}
          onChange={onFromChange}
          onSelect={onFromSelect}
          onBlur={onFromBlur}
          error={fromError}
          showMyLocation={showMyLocation}
          onMyLocation={onMyLocation}
          isLocating={isLocatingFrom}
          resolved={Boolean(fromPlace.lat && fromPlace.lng)}
        />
      </div>

      <div className="relative z-20 mt-4 overflow-visible">
        <AddressInput
          id="destination"
          name="destination"
          type="drop"
          label="Drop location"
          placeholder="Search destination in India (pick from list)"
          value={toPlace.label}
          onChange={onToChange}
          onSelect={onToSelect}
          onBlur={onToBlur}
          error={toError}
          resolved={Boolean(toPlace.lat && toPlace.lng)}
        />
      </div>

      <button
        type="button"
        onClick={onSwap}
        disabled={!canSwap}
        title="Swap pickup and drop"
        aria-label="Swap pickup and drop locations"
        className="absolute right-0 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-teal-200 bg-white text-teal-600 shadow-md ring-4 ring-white transition hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:shadow-none disabled:ring-gray-100"
      >
        <ArrowsUpDownIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default LocationFieldsGroup;
