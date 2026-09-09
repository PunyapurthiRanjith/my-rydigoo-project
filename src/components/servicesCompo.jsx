import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CustomCardComponent from "../components/customCard";
import bikeImage from "../assets/bike-image.png";
import autoImage from "../assets/auto-image.webp";
import carImage from "../assets/car-taxi.svg";
import { VEHICLE_TYPES } from "../utils/fareCalculator";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ServicesComponent = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const isInView3 = useInView(ref3, { once: true });

  const services = [
    {
      ref: ref1,
      inView: isInView1,
      image: bikeImage,
      vehicle: VEHICLE_TYPES.bike,
      text: "Beat the traffic with quick bike rides. Perfect for solo commuters on a budget.",
    },
    {
      ref: ref2,
      inView: isInView2,
      image: autoImage,
      vehicle: VEHICLE_TYPES.auto,
      text: "Classic auto-rickshaw rides for short hops across the city. Affordable and reliable.",
    },
    {
      ref: ref3,
      inView: isInView3,
      image: carImage,
      vehicle: VEHICLE_TYPES.car,
      text: "Comfortable AC cab rides for family trips, airport runs, or long distances.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-teal-50/30 px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
          Our Services
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
          Choose how you want to ride
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Transparent fare calculation — base fare + distance charge + 5% GST. No surprises.
        </p>

        <div className="mt-14 flex flex-col flex-wrap items-center justify-center gap-10 lg:flex-row">
          {services.map(({ ref, inView, image, vehicle, text }) => (
            <motion.div
              key={vehicle.id}
              ref={ref}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.6 }}
            >
              <CustomCardComponent
                image={image}
                cardTitle={vehicle.label}
                text={text}
                baseFare={vehicle.baseFare}
                perKm={vehicle.perKm}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesComponent;
