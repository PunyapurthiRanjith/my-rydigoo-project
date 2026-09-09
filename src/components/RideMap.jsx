import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { DEFAULT_MAP_CENTER } from "../config/maps";
import { fromMarkerIcon, toMarkerIcon, userMarkerIcon } from "../utils/leafletIcons";

const FitRouteBounds = ({ routeCoordinates, from, to, userLocation }) => {
  const map = useMap();

  useEffect(() => {
    const points = [];

    if (routeCoordinates?.length) {
      points.push(...routeCoordinates);
    }
    if (from) {
      points.push([from.lat, from.lng]);
    }
    if (to) {
      points.push([to.lat, to.lng]);
    }
    if (userLocation) {
      points.push([userLocation.lat, userLocation.lng]);
    }

    if (points.length === 0) {
      return;
    }

    if (points.length === 1) {
      map.setView(points[0], 14);
      return;
    }

    map.fitBounds(points, { padding: [56, 56] });
  }, [map, routeCoordinates, from, to, userLocation]);

  return null;
};

const MapLegend = () => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5, duration: 0.4 }}
    className="absolute bottom-6 left-6 z-[1000] m-2 max-w-[200px] rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-gray-200 backdrop-blur-md"
  >
    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">
      Map legend
    </p>
    <div className="space-y-2.5 text-sm text-gray-700">
      <div className="flex items-center gap-3">
        <span className="inline-block h-3.5 w-3.5 shrink-0 rounded-full bg-blue-600 ring-2 ring-blue-200" />
        <span>My location</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[9px] font-bold text-white">
          A
        </span>
        <span>Pickup</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
          B
        </span>
        <span>Drop</span>
      </div>
    </div>
  </motion.div>
);

const RideMap = ({
  routeCoordinates = [],
  from = null,
  to = null,
  userLocation = null,
  className = "",
}) => {
  const center = from
    ? [from.lat, from.lng]
    : userLocation
      ? [userLocation.lat, userLocation.lng]
      : DEFAULT_MAP_CENTER;

  const isSamePoint = (a, b) =>
    a && b && Math.abs(a.lat - b.lat) < 0.0001 && Math.abs(a.lng - b.lng) < 0.0001;

  const showUserMarker =
    userLocation && !isSamePoint(userLocation, from) && !isSamePoint(userLocation, to);

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-2xl ${className}`}>
      <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full rounded-2xl">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitRouteBounds
          routeCoordinates={routeCoordinates}
          from={from}
          to={to}
          userLocation={userLocation}
        />

        {routeCoordinates.length > 0 && (
          <Polyline positions={routeCoordinates} color="#4f46e5" weight={5} opacity={0.85} />
        )}

        {from && (
          <Marker position={[from.lat, from.lng]} icon={fromMarkerIcon}>
            <Popup>
              <strong>Pickup (A)</strong>
              <br />
              {from.label}
            </Popup>
          </Marker>
        )}

        {to && (
          <Marker position={[to.lat, to.lng]} icon={toMarkerIcon}>
            <Popup>
              <strong>Drop (B)</strong>
              <br />
              {to.label}
            </Popup>
          </Marker>
        )}

        {showUserMarker && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userMarkerIcon}>
            <Popup>
              <strong>My location</strong>
              <br />
              You are here
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <MapLegend />
    </div>
  );
};

export default RideMap;
