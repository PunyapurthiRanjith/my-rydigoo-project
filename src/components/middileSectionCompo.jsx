import { motion } from "framer-motion";
import middleImage from "../assets/middle-image.jpg";

const MiddleComponent = () => {
  const variants = {
    hidden: { opacity: 0, x: -20 }, // Start slightly to the left and invisible
    visible: { opacity: 1, x: 0 },   // Move to its original position and become visible
  };

  return (
    <motion.div
      className="flex flex-col-reverse md:flex-row items-center justify-even gap-8 my-16 px-4 md:px-0 p-5"
      initial="hidden"
      whileInView="visible"
      variants={variants}
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: false }} 
    >
      <div className="md:w-1/2 lg:w-4/12 sm:w-1/2 mx-14">
        <img
          className="w-full h-auto object-cover rounded-lg"
          src={middleImage}
          alt="Generic placeholder"
        />
      </div>
      <div className="md:w-7/12 lg:w-8/12 w-full text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Oh yeah, it's that good.{" "}<br />
          <span className="text-gray-500">See for yourself.</span>
        </h2>
        <p className="text-base md:text-lg leading-relaxed">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi qui quia quidem exercitationem dolorem libero placeat possimus vitae laudantium asperiores ea nam quos illum, ab harum neque fugiat veritatis est!
          Pariatur voluptatibus quae vel assumenda. Id quidem corporis laudantium repellendus quaerat est ipsum nemo accusantium, officiis delectus neque aliquid magni culpa nulla! Quisquam quasi, asperiores corrupti sint labore molestiae modi!
        </p>
      </div>
    </motion.div>
  );
};

export default MiddleComponent;
