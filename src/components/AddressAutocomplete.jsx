import { MapPinIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { searchPlaces } from "../services/geocoding";

const AddressAutocomplete = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  onSelect,
  onBlur,
  icon: Icon = MapPinIcon,
  iconBg = "bg-teal-100",
  iconColor = "text-teal-700",
  variant = "pickup",
  resolved = false,
  error = "",
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const containerRef = useRef(null);
  const selectedLabelRef = useRef(null);
  const requestIdRef = useRef(0);

  const ringColor = error
    ? "ring-red-300 focus-within:ring-red-500"
    : variant === "pickup"
      ? "focus-within:ring-teal-500"
      : "focus-within:ring-indigo-500";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const query = value?.trim() || "";

    if (query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setSearchError("");
      return;
    }

    if (resolved || (selectedLabelRef.current && query === selectedLabelRef.current)) {
      if (resolved) {
        selectedLabelRef.current = query;
      }
      return;
    }

    const requestId = ++requestIdRef.current;
    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError("");

      try {
        const results = await searchPlaces(query);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setSuggestions(results);
        setIsOpen(results.length > 0);
        if (results.length === 0) {
          setSearchError("No locations found in India. Try a city or area within India.");
        }
      } catch (error) {
        if (requestId !== requestIdRef.current) {
          return;
        }
        setSuggestions([]);
        setIsOpen(false);
        setSearchError(error.message);
      } finally {
        if (requestId === requestIdRef.current) {
          setIsSearching(false);
        }
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (place) => {
    selectedLabelRef.current = place.label.trim();
    setSuggestions([]);
    setIsOpen(false);
    setSearchError("");
    onSelect(place);
  };

  const handleInputChange = (text) => {
    selectedLabelRef.current = null;
    onChange(text);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${isOpen ? "z-50" : "z-10"}`}
    >
      <div
        className={`relative flex items-center rounded-xl bg-white shadow-sm ring-1 ring-inset transition focus-within:ring-2 ${error ? "ring-red-300 bg-red-50/30" : "ring-gray-200"} ${ringColor}`}
      >
        <div
          className={`pointer-events-none absolute left-3 flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
        </div>

        <input
          id={id}
          name={name}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          onBlur={onBlur}
          className="w-full rounded-xl border-0 bg-transparent py-3.5 pl-14 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
        />

        {isSearching && (
          <span className="pointer-events-none absolute right-3 flex h-5 w-5 items-center justify-center">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
          </span>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-[100] max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-2xl"
        >
          {suggestions.map((place) => (
            <li key={`${place.label}-${place.lat}-${place.lng}`} role="option">
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(place)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-teal-50 active:bg-teal-100"
              >
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                <span className="leading-snug">{place.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {searchError && !isSearching && (
        <p className="mt-2 text-xs text-red-500">{searchError}</p>
      )}
    </div>
  );
};

export default AddressAutocomplete;
