import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { AnimatedPage } from "../components/AnimatedPage";
import FareBreakdown from "../components/FareBreakdown";
import FormInput from "../components/FormInput";
import { formatCurrency, VEHICLE_TYPES } from "../utils/fareCalculator";
import { useToast } from "../hooks/useToast";
import { clearAppliedOffer } from "../utils/offers";
import { saveRide } from "../utils/rides";

const PaymentScreenComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { ride } = location.state || {};

  useEffect(() => {
    if (!ride) {
      navigate("/app-interface", { replace: true });
    }
  }, [ride, navigate]);

  const handlePayment = (event) => {
    event.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      saveRide({ ...ride, paymentMethod });
      if (ride.fareDetails?.discount > 0) {
        clearAppliedOffer();
      }
      setIsProcessing(false);
      setIsPaid(true);
      toast.success(
        ride.fareDetails?.discount > 0
          ? `Payment successful! You saved ${formatCurrency(ride.fareDetails.discount)}.`
          : "Payment successful! Your ride is booked."
      );
    }, 1200);
  };

  if (!ride) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white">
      <AppHeader />
      <AnimatedPage className="mx-auto max-w-lg px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
        <p className="mt-2 text-sm text-gray-500">Complete your Rydigoo ride booking</p>

        <div className="mt-6 glass-card p-5 text-sm">
          <div className="flex items-center gap-2 text-teal-700">
            <span className="text-lg">
              {VEHICLE_TYPES[ride.vehicleType]?.emoji || "🚗"}
            </span>
            <span className="font-semibold">{ride.fareDetails?.vehicleLabel || "Ride"}</span>
          </div>
          <p className="mt-3 text-gray-600"><span className="font-medium text-teal-700">A</span> {ride.from}</p>
          <p className="mt-1 text-gray-600"><span className="font-medium text-indigo-700">B</span> {ride.to}</p>
          <p className="mt-1 text-gray-600"><span className="font-medium">Distance:</span> {ride.distance}</p>
          <p className="mt-1 text-gray-600"><span className="font-medium">Duration:</span> {ride.duration}</p>
        </div>

        {ride.fareDetails && (
          <div className="mt-6">
            <FareBreakdown fare={ride.fareDetails} />
          </div>
        )}

        {isPaid ? (
          <div className="mt-8 space-y-4 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
            <div className="text-5xl">✅</div>
            <p className="text-xl font-bold text-green-800">Payment successful!</p>
            <p className="text-sm text-green-700">
              {formatCurrency(ride.fare)} paid
              {ride.fareDetails?.discount > 0 && (
                <> · Saved {formatCurrency(ride.fareDetails.discount)} with {ride.fareDetails.offerCode}</>
              )}
              {" "}· Driver arriving in ~{ride.duration}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/my-rides" className="btn-primary">
                View My Rides
              </Link>
              <button type="button" onClick={() => navigate("/")} className="btn-secondary">
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="mt-8 space-y-4 glass-card p-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900">Payment method</label>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { id: "upi", label: "UPI", icon: "📱" },
                  { id: "card", label: "Card", icon: "💳" },
                  { id: "cash", label: "Cash", icon: "💵" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`rounded-xl border-2 p-3 text-center text-sm transition ${
                      paymentMethod === method.id
                        ? "border-teal-500 bg-teal-50 font-semibold text-teal-800"
                        : "border-gray-200 hover:border-teal-200"
                    }`}
                  >
                    <div className="text-xl">{method.icon}</div>
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === "upi" && (
              <FormInput id="upi" label="UPI ID" placeholder="yourname@upi" icon="📱" required />
            )}

            {paymentMethod === "card" && (
              <FormInput id="card" label="Card number" placeholder="1234 5678 9012 3456" icon="💳" required />
            )}

            {paymentMethod === "cash" && (
              <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                Pay {formatCurrency(ride.fare)} directly to the driver after the ride.
              </p>
            )}

            <button type="submit" disabled={isProcessing} className="btn-primary w-full">
              {isProcessing ? "Processing..." : `Pay ${formatCurrency(ride.fare)}`}
            </button>
          </form>
        )}
      </AnimatedPage>
    </div>
  );
};

export default PaymentScreenComponent;
