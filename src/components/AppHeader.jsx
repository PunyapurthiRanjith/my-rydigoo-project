import { Link, NavLink, useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "../utils/auth";
import RydigooLogo from "./RydigooLogo";

const navTabs = [
  { to: "/app-interface", label: "Book Ride", icon: "🛺" },
  { to: "/offers", label: "Offers", icon: "🏷️" },
  { to: "/my-rides", label: "My Rides", icon: "📋" },
  { to: "/my-profile", label: "My Profile", icon: "👤" },
];

const AppHeader = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const handleLogout = () => {
    logout();
    navigate("/login-page");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-teal-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        {/* Logo + Nav side by side */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-6">
          <Link to="/app-interface" className="shrink-0">
            <RydigooLogo size="sm" />
          </Link>

          <nav className="flex min-w-0 items-center gap-0.5 overflow-x-auto sm:gap-1">
            {navTabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold transition sm:gap-1.5 sm:px-3.5 sm:text-sm ${
                    isActive
                      ? "bg-teal-50 text-teal-800 ring-1 ring-teal-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`
                }
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {user && (
            <span className="hidden rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 lg:inline">
              Hi, {user.username}
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="btn-secondary px-3 py-1.5 text-xs sm:text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
