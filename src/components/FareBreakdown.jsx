import { formatCurrency } from "../utils/fareCalculator";

const FareBreakdown = ({ fare, compact = false }) => {
  if (!fare) {
    return null;
  }

  const hasDiscount = fare.discount > 0;
  const displayTotal = hasDiscount ? fare.grandTotal : fare.grandTotal;

  if (compact) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-indigo-50 p-4 ring-1 ring-teal-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-teal-700">Estimated fare</p>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(fare.originalGrandTotal || fare.grandTotal + fare.discount)}
              </p>
            )}
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(displayTotal)}</p>
            {hasDiscount && (
              <p className="text-xs font-medium text-green-600">
                {fare.offerCode} saved {formatCurrency(fare.discount)}
              </p>
            )}
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-indigo-700 shadow-sm">
            {fare.vehicleLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-teal-600 to-indigo-600 px-5 py-4 text-white">
        <p className="text-sm opacity-90">Fare breakdown</p>
        {hasDiscount && (
          <p className="text-sm line-through opacity-70">
            {formatCurrency(fare.originalGrandTotal || fare.grandTotal + fare.discount)}
          </p>
        )}
        <p className="text-3xl font-bold">{formatCurrency(displayTotal)}</p>
        <p className="mt-1 text-sm opacity-90">
          {fare.vehicleLabel} · {fare.distanceKm} km
          {hasDiscount && ` · ${fare.offerCode} applied`}
        </p>
      </div>
      <div className="space-y-3 p-5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Base fare</span>
          <span>{formatCurrency(fare.baseFare)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>
            Distance ({fare.distanceKm} km × {formatCurrency(fare.perKmRate)})
          </span>
          <span>{formatCurrency(fare.distanceCharge)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Ride subtotal</span>
          <span>{formatCurrency(fare.subtotal)}</span>
        </div>
        {fare.subtotal < fare.minimumFare && (
          <div className="flex justify-between text-amber-700">
            <span>Minimum fare applied</span>
            <span>{formatCurrency(fare.minimumFare)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>GST (5%)</span>
          <span>{formatCurrency(fare.gst)}</span>
        </div>
        {hasDiscount && (
          <div className="flex justify-between font-medium text-green-700">
            <span>Offer discount ({fare.offerCode})</span>
            <span>-{formatCurrency(fare.discount)}</span>
          </div>
        )}
        {fare.offerInvalidReason && (
          <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
            {fare.offerCode} not applied: {fare.offerInvalidReason}
          </div>
        )}
        <div className="flex justify-between border-t pt-3 font-bold text-gray-900">
          <span>Total payable</span>
          <span>{formatCurrency(displayTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default FareBreakdown;
