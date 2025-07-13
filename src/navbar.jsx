import React from "react";
import { Link } from "react-router-dom";
import image from "./assets/app-interface-image.png";

function Home() {
  return (
    <div className="flex flex-row ">
      <div className="mt-5">
        <img src={image} alt="" />
      </div>
      <div className="text-center py-32 sm:py-48 lg:py-56 bg-opacity-50">
        <h1 className="text-5xl font-semibold text-white-700 sm:text-7xl">
          Data to enrich your online business
        </h1>
        <p className="mt-8 text-lg text-gray-700 sm:text-xl">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo.
        </p>
        <div className="mt-10 flex justify-center gap-x-6"></div>
      </div>
    </div>
  );
}

export default Home;
