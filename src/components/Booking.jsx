import React from "react";

import { MdOutlineLocationOn, MdMyLocation } from "react-icons/md";
import { BiDirections } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";

export const Booking = ({vehicle}) => {
  return (
    <div className="w-full p-6 bg-[#00243f] flex flex-col lg:flex-row items-center justify-around rounded-md shadow-md gap-4">
      {/* Location */}
      <div className="flex flex-col lg:flex-row items-center w-full ">
        <div className="relative w-full">
          <label className="absolute left-12 uppercase text-gray-400 top-2 text-[10px] tracking-widest w-full">
            Origin
          </label>
          <button className="absolute top-5 left-3 group">
            <MdMyLocation className="group-hover:text-purple-600" size={25} />
          </button>
          <input
            type="text"
            placeholder="Where are you from?"
            className=" rounded-tl-md rounded-tr-md w-full shadow-md rounded-b-none lg:rounded-r-none lg:rounded-l-md  pl-12 text-sm  py-3 pt-6 border-r-[1px] border-gray-300 text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800 "
          />
        </div>

        <div className="relative w-full">
          <button className="hidden lg:block absolute top-3 -left-[18px] bg-white border-gray-200 border-2 rounded-md p-1">
            <BiDirections size={25} />
          </button>
          <label className="absolute left-12 uppercase text-gray-400 top-2 text-[10px] tracking-widest  group-focus:top-12">
            Destiny
          </label>

          <MdOutlineLocationOn
            className="absolute top-5 left-3 lg:left-5"
            size={25}
          />

          <input
            type="text"
            placeholder="Your destination?"
            className="truncate w-full rounded-r-md shadow-md lg:rounded-r-md rounded-l-md   text-sm rounded-t-none  pl-12 lg:pl-12 border-t-2 lg:border-t-0 border-gray-200 lg:rounded-l-none  py-3 pt-6 border-l-[1px] lg:border-gray-300  font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800"
          />
        </div>
      </div>

      {/* Calendar */}

      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="relative w-full">
          <label className="absolute left-12 uppercase text-gray-400 top-2 text-[10px] tracking-widest">
            DATES
          </label>
          <button className="absolute top-5 left-3 group">
            <BsCalendar3 className="group-hover:text-purple-600" size={25} />
          </button>
          <input
            type="date"
            className="rounded-tl-md rounded-tr-md w-full   lg:rounded-l-md lg:rounded-r-none  pl-12 pr-2 py-3 pt-6 border-r-[1px] border-gray-300 text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800"
          />
        </div>

        <div className="relative w-full">
          <input
            type="date"
            className="w-full rounded-r-md rounded-l-md  lg:rounded-r-md  rounded-t-none  pl-10 lg:pl-4 pr-2  border-t-2 lg:border-t-0 border-gray-200 lg:rounded-l-none  py-3 pt-6 border-l-[1px] lg:border-gray-300 text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800"
          />
        </div>
      </div>

      <button className="bg-white text-black font-bold py-4 rounded-lg w-full lg:w-[20%] hover:bg-gray-200 transition-all duration-200">
        Continue
      </button>
    </div>
  );
};
