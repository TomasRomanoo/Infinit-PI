"use client";
import Link from "next/link";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";

import { useRouter } from "next/navigation";
import Image from "next/image";

import mock from "@/assets/images/mock.png";

const Detail = (vehicle) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-poppins font-semibold">
          {vehicle.name}
        </p>
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
        <Hero vehicle={vehicle}/>
        <Gallery />

        <div className="flex flex-col items-start gap-6">
          <p className="text-poppins text-2xl mt-10">Description</p>

          <p className="text-gray-400 text-xl">{vehicle.long_description}</p>
        </div>
      </div>
    </div>
  );
};

const Hero = ({vehicle}) => {
  return (
    <div className="w-full p-6 bg-secondary flex items-center rounded-md shadow-md">
      <p>{vehicle.price}/day</p>
      <button className="bg-white px-4 py-2 rounded-lg">Book</button>
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
