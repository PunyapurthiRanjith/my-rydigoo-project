import { motion } from "framer-motion";
import homeImage from "../assets/homepage-image.jpg";
import heroRide from "../assets/hero-ride.svg";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import RydigooLogo from "./RydigooLogo";
import { VEHICLE_TYPES } from "../utils/fareCalculator";

const HomeIntroComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Services", href: "#services" },
    { name: "Features", href: "#features" },
    { name: "Team", href: "#team" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/40 to-indigo-50/40">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <Link to="/">
            <RydigooLogo size="md" />
          </Link>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 rounded-lg p-2.5 text-gray-700 hover:bg-white/60"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-700 transition hover:text-teal-600"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Link to="/login-page" className="text-sm font-semibold text-gray-700 hover:text-teal-600">
              Log in
            </Link>
            <Link to="/register-page" className="btn-primary">
              Get Started
            </Link>
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/20" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <RydigooLogo size="sm" />
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-2">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-teal-50"
                >
                  {item.name}
                </a>
              ))}
              <Link
                to="/login-page"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-teal-50"
              >
                Log in
              </Link>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-32">
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-teal-300/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 -z-10 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div>
            <span className="inline-flex rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-800">
              🚀 MVP Demo · No billing required
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Ride anywhere with{" "}
              <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Rydigoo
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Book bike, auto, or cab rides in seconds. Live maps, transparent fare
              breakdown, and instant booking — all running free on localhost.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register-page" className="btn-primary px-6 py-3">
                Register Free
              </Link>
              <Link to="/login-page" className="btn-secondary px-6 py-3">
                Log in
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-gray-100 backdrop-blur">
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-700">3</p>
                <p className="text-xs text-gray-500">Ride types</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-700">₹{VEHICLE_TYPES.bike.minimumFare}+</p>
                <p className="text-xs text-gray-500">Starting fare</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-700">5%</p>
                <p className="text-xs text-gray-500">GST included</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroRide}
              alt="Rydigoo ride illustration"
              className="relative z-10 w-full max-w-lg rounded-3xl shadow-2xl"
            />
            <img
              src={homeImage}
              alt="City ride"
              className="absolute -bottom-6 -right-4 z-20 w-40 rounded-2xl shadow-xl ring-4 ring-white sm:w-52"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeIntroComponent;
