import Image from "next/image";
import React from "react";

import image from "@/assets/images/honda-civic.png";
import axios from "axios";

export const ModCar = (props) => {
  const modifyCar = (id) => {
  
  };

  return (
    <div className=" w-full  rounded-2xl overflow-hidden shadow-md flex flex-col font-poppins relative hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between p-4">
        <div className="w-1/2">
          <Image className="w-full object-contain" src={image} />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-start gap-1 font-bold text-lg">
            <p className="text-start truncate ">{props.vehicle.brand}</p>
            <p>{props.vehicle.model}</p>
          </div>
          <p className="text-gray-400 font-semibold">{props.vehicle.year}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="ml-4">
          <span className="font-semibold">${props.vehicle.price_per_day}</span>
          <span className="text-gray-400">/day</span>
        </p>
        <button
          className="bg-green-400 font-semibold text-white px-8 py-3 rounded-tl-2xl hover:bg-black transition-all duration-300 ease-in-out"
          onClick={() => {
            modifyCar();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
