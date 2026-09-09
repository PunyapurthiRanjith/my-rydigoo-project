import { motion } from "framer-motion";
import { AnimatedFloat } from "./AnimatedPage";

const BookRideHeroStack = () => (
  <div className="relative h-full min-h-[340px] w-full lg:min-h-[calc(100vh-7rem)]">
    <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-400/20 via-transparent to-indigo-400/20 blur-3xl" />

    <AnimatedFloat className="relative h-full w-full">
      {/* Base layer — full panel */}
      <img
        src="/book-ride-hero.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/60"
      />

      {/* Top-right layer — spaced from base edges */}
      <motion.img
        src="/hero-ride.svg"
        alt=""
        aria-hidden
        initial={{ opacity: 0, y: 20, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute right-[6%] top-[8%] w-[44%] max-w-[280px] rounded-2xl object-cover shadow-2xl ring-4 ring-white/95 sm:right-[8%] sm:top-[10%] sm:w-[42%]"
      />

      {/* Bottom-left layer — spaced from base and top-right */}
      <motion.img
        src="/car-taxi.svg"
        alt="Book a ride with Rydigoo"
        initial={{ opacity: 0, x: -16, rotate: -5 }}
        animate={{ opacity: 1, x: 0, rotate: -5 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="absolute bottom-[10%] left-[6%] w-[40%] max-w-[260px] rounded-2xl object-cover shadow-xl ring-4 ring-white/95 sm:bottom-[12%] sm:left-[8%] sm:w-[38%]"
      />
    </AnimatedFloat>
  </div>
);

export default BookRideHeroStack;
