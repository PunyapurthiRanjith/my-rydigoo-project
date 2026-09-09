import AppHeader from "../components/AppHeader";
import { AnimatedItem, AnimatedPage } from "../components/AnimatedPage";
import { getLoggedInUser } from "../utils/auth";
import { getRideStats } from "../utils/rides";
import { formatCurrency, VEHICLE_TYPES } from "../utils/fareCalculator";

const staticProfileExtras = {
  memberSince: "2026",
  rating: 4.8,
  city: "Hyderabad",
  preferredVehicle: "auto",
};

const MyProfileScreen = () => {
  const user = getLoggedInUser();
  const stats = getRideStats();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-white">
      <AppHeader />
      <AnimatedPage className="mx-auto max-w-3xl px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="mt-1 text-sm text-gray-500">Your account details for this session</p>

        <div className="mt-6 glass-card overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-indigo-600 px-6 py-8 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur">
                {user.username?.charAt(0)?.toUpperCase() || "R"}
              </div>
              <div>
                <p className="text-xl font-bold">{user.username}</p>
                <p className="text-sm text-teal-100">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2">
            {[
              { label: "Mobile", value: user.mobile || "Not provided", icon: "📱" },
              { label: "City", value: staticProfileExtras.city, icon: "🏙️" },
              { label: "Member since", value: staticProfileExtras.memberSince, icon: "⭐" },
              { label: "User rating", value: `${staticProfileExtras.rating} / 5`, icon: "🌟" },
              {
                label: "Preferred ride",
                value: VEHICLE_TYPES[staticProfileExtras.preferredVehicle]?.label,
                icon: VEHICLE_TYPES[staticProfileExtras.preferredVehicle]?.emoji,
              },
              { label: "Account type", value: "Rydigoo MVP User", icon: "🎫" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {item.icon} {item.label}
                </p>
                <p className="mt-1 font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <AnimatedItem delay={0.15} className="mt-6 grid grid-cols-2 gap-4">
          <div className="glass-card p-5 text-center">
            <p className="text-3xl font-bold text-teal-700">{stats.totalRides}</p>
            <p className="mt-1 text-sm text-gray-500">Total rides (session)</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-3xl font-bold text-indigo-700">{formatCurrency(stats.totalSpent)}</p>
            <p className="mt-1 text-sm text-gray-500">Total spent (session)</p>
          </div>
        </AnimatedItem>
      </AnimatedPage>
    </div>
  );
};

export default MyProfileScreen;
