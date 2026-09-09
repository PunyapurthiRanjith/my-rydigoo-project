import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroRide from "../assets/hero-ride.svg";
import RydigooLogo from "./RydigooLogo";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-indigo-50">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 lg:grid-cols-2">
        <div className="hidden flex-col justify-between p-10 lg:flex">
          <Link to="/">
            <RydigooLogo size="lg" />
          </Link>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={heroRide}
              alt="Rydigoo ride illustration"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto w-full max-w-md drop-shadow-xl"
            />
            <h1 className="mt-8 text-3xl font-bold text-gray-900">
              Your city ride, simplified.
            </h1>
            <p className="mt-3 max-w-md text-gray-600">
              Book bike, auto, or cab rides with live routes, transparent fare
              breakdown, and instant mock payment.
            </p>
          </motion.div>
          <p className="text-sm text-gray-400">© 2026 Rydigoo MVP</p>
        </div>

        <div className="flex flex-col justify-center px-6 py-12 sm:px-10">
          <div className="mb-8 lg:hidden">
            <RydigooLogo size="md" className="justify-center" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-gray-100 backdrop-blur"
          >
            <h2 className="text-center text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-center text-sm text-gray-500">{subtitle}</p>
            )}
            <div className="mt-8">{children}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
