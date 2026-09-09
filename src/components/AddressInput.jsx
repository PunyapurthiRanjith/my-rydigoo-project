import { MapPinIcon, FlagIcon } from "@heroicons/react/24/outline";
import AddressAutocomplete from "./AddressAutocomplete";

const VARIANTS = {
  pickup: {
    icon: MapPinIcon,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
    variant: "pickup",
  },
  drop: {
    icon: FlagIcon,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700",
    variant: "drop",
  },
};

const AddressInput = ({
  id,
  name,
  label,
  placeholder,
  type = "pickup",
  value,
  onChange,
  onSelect,
  onBlur,
  error,
  showMyLocation = false,
  onMyLocation,
  isLocating = false,
  resolved = false,
}) => {
  const config = VARIANTS[type] || VARIANTS.pickup;

  return (
    <div className="relative overflow-visible">
      <div className="mb-2 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-gray-900">
          {label}
        </label>
        {showMyLocation && (
          <button
            type="button"
            onClick={onMyLocation}
            disabled={isLocating}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
          >
            {isLocating ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                Locating...
              </>
            ) : (
              <>
                <MapPinIcon className="h-3.5 w-3.5" />
                Use my location
              </>
            )}
          </button>
        )}
      </div>

      <AddressAutocomplete
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        onBlur={onBlur}
        icon={config.icon}
        iconBg={config.iconBg}
        iconColor={config.iconColor}
        variant={config.variant}
        resolved={resolved}
        error={error}
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {resolved && !error && value && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-teal-600">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />
          Location confirmed
        </p>
      )}
    </div>
  );
};

export default AddressInput;
