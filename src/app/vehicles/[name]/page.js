"use client";
import Link from "next/link";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";

import { useRouter } from "next/navigation";
import Image from "next/image";

import mock from "@/assets/images/mock.png";

import { MdOutlineLocationOn, MdMyLocation } from "react-icons/md";
import { BiDirections } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";

import Calendar from "react-calendar";

const Detail = (vehicle) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-poppins font-semibold">{vehicle.name}</p>
        <button
          onClick={() => {
            router.back();
          }}
          className="text-xl text-blue-700 hover:text-purple-600"
        >
          Go back
        </button>
      </div>

      <div className="bg-white rounded-lg w-full h-full shadow-lg py-8 p-4 md:px-12 space-y-8">
        <Hero vehicle={vehicle} />
        <Gallery />

        <div className="flex flex-col items-start gap-6">
          <p className="text-poppins text-2xl mt-10">Description</p>

          <p className="text-gray-400 text-xl">{vehicle.long_description}</p>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ vehicle }) => {
  const [value, onChange] = useState(new Date());
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
            className="rounded-l-md rounded-r-md w-full shadow-md rounded-b-none lg:rounded-b-md lg:rounded-r-none pl-12 text-sm  py-3 pt-6 border-r-[1px] border-gray-300 text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800 "
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
            className="truncate w-full rounded-r-md shadow-md rounded-l-md lg:rounded-r-md  text-sm rounded-t-none lg:rounded-t-md pl-12 lg:pl-12 border-t-2 lg:border-t-0 border-gray-200 lg:rounded-l-none  py-3 pt-6 border-l-[1px] lg:border-gray-300  font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800"
          />
        </div>
      </div>

      {/* Calendar */}

      {/*      <div className="relative w-full">
        <label className="absolute left-6 uppercase text-gray-400 top-2 text-[10px] tracking-widest">
          LENGTH
        </label>
        <input
          type="text"
          placeholder="How many days?"
          className="w-full rounded-md p-6 shadow-md   text-sm py-3 pt-6 border-r-[1px] border-gray-300 text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800"
        />
      </div> */}

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
            placeholder="Leaving"
            className="rounded-l-md rounded-r-md w-full  rounded-b-none lg:rounded-b-md lg:rounded-r-none  pl-12 pr-2 py-3 pt-6 border-r-[1px] border-gray-300 text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800"
          />
        </div>

        <div className="relative w-full">
          <input
            type="date"
            placeholder="Arriving"
            className="w-full rounded-r-md rounded-l-md lg:rounded-r-md  rounded-t-none lg:rounded-t-md pl-10 lg:pl-4 pr-2  border-t-2 lg:border-t-0 border-gray-200 lg:rounded-l-none  py-3 pt-6 border-l-[1px] lg:border-gray-300 text-ellipsis font-semibold placeholder:font-normal placeholder:italic focus:outline-2 outline-blue-800"
          />
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-[20%]   lg:justify-center items-start font-bold text-white">
        <label>Total</label>
        <p>${vehicle.price}/day</p>
      </div>
      <button className="bg-white text-black font-bold py-4 rounded-lg w-full lg:w-[20%] hover:bg-gray-200 transition-all duration-200">
        Continue
      </button>
    </div>
  );
};

const Gallery = () => {
  const [gallery, isGalleryOpen] = useState(false);

  const openGalleryModal = () => {
    isGalleryOpen(true);
  };

  const images = [
    { id: 1, url: mock },
    { id: 2, url: mock },
    { id: 3, url: mock },
    { id: 4, url: mock },
    { id: 5, url: mock },
    { id: 6, url: mock },
    { id: 7, url: mock },
    { id: 8, url: mock },
    { id: 9, url: mock },
    { id: 10, url: mock },
    { id: 11, url: mock },
    { id: 12, url: mock },
    { id: 13, url: mock },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        {/* Main Image */}
        <div className="w-full hover:brightness-75 transition-all duration-200 self-stretch cursor-pointer">
          <Image className="object-contain rounded-lg" src={images[0].url} />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-3/4">
          <div className="lg:grid flex flex-row items-center lg:grid-cols-2 lg:grid-row-2 gap-4 justify-center w-full">
            {images.slice(1, 5).map((image, key) => (
              <div className=" flex justify-center items-center hover:brightness-75 transition-all duration-200 cursor-pointer">
                <Image
                  key={key}
                  className="object-contain rounded-lg"
                  src={image.url}
                  alt={`Image ${image.id}`}
                />
              </div>
            ))}
          </div>
          <button
            className="w-full bg-primary text-white p-4 rounded-md hover:bg-secondary transition-all duration-200"
            onClick={openGalleryModal}
          >
            See more
          </button>
        </div>
      </div>

      {gallery && <GalleryModal images={images} />}
    </div>
  );
};

const GalleryModal = ({ image_id, images }) => {
  return (
    <div className=" w-full h-[500px] absolute top-0 left-0 z-10 bg-red-500">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-full w-full flex items-center justify-center"
      >
        <Image className="object-contain" src={images[0].url} />
      </Swiper>
    </div>
  );
};

Detail.defaultProps = {
  name: "Honda Civic 2017",
  long_description: `
    The Honda Civic is a popular compact car that has garnered a reputation for its reliability, efficiency, and practicality. Known for its enduring appeal and consistent evolution, the Civic has been a staple in the automotive market for several decades. The exterior design of the Honda Civic often features a sleek and aerodynamic profile, with modern styling cues that vary across different generations. Its compact size makes it maneuverable in urban environments while still offering ample interior space for both passengers and cargo. Inside the cabin, the Honda Civic typically offers a comfortable and functional layout with quality materials. Depending on the trim level and model year, it may come equipped with a range of features such as touchscreen infotainment systems, advanced safety technologies, smartphone integration, and comfortable seating.
`,
  price: 30.5,
};

export default Detail;
