"use client";
import Link from "next/link";
import React, { useState } from "react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/swiper-bundle.min.css";

import { useRouter } from "next/navigation";
import Image from "next/image";

import mock from "@/assets/images/mock.png";
import peugeot from "@/assets/images/peugeot.jpg";

import { MdOutlineLocationOn, MdMyLocation } from "react-icons/md";
import { BiDirections } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import Calendar from "react-calendar";
import swiperConfig from "@/utils/swiperConfig";
import { Booking } from "@/components/Booking";

const Detail = (vehicle) => {
  const images = [
    { id: 1, url: peugeot },
    { id: 2, url: peugeot },
    { id: 3, url: peugeot },
    { id: 4, url: peugeot },
    { id: 5, url: peugeot },
    { id: 6, url: peugeot },
    { id: 7, url: mock },
    { id: 8, url: mock },
    { id: 9, url: mock },
    { id: 10, url: mock },
    { id: 11, url: mock },
    { id: 12, url: mock },
    { id: 13, url: mock },
  ];

  const router = useRouter();
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);


  const openGalleryModal = (imageId) => {
    setSelectedImageId(imageId);
    setGalleryOpen(true);
  };

  const closeGalleryModal = () => {
    setGalleryOpen(false);
  };
  return (
    <>
      {isGalleryOpen && (
        <GalleryModal images={images} close={closeGalleryModal} selectedImageId={selectedImageId} />
      )}
      <div
        className={`flex flex-col gap-4 ${
          isGalleryOpen ? "opacity-10" : "opacity-100"
        }`}
        id="detail"
      >
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
          <Booking />
          <Gallery
            isGalleryOpen={isGalleryOpen}
            openGalleryModal={openGalleryModal}
            closeGalleryModal={closeGalleryModal}
            setSelectedImageId={setSelectedImageId}
            images={images}
          />
          <div className="flex flex-col items-start gap-6">
            <p className="text-poppins text-2xl mt-10">Description</p>

            <p className="text-gray-400 text-xl">{vehicle.long_description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Gallery = ({
  isGalleryOpen,
  openGalleryModal,
  closeGalleryModal,
  images,
  setSelectedImageId
}) => {

  return (
    <div className={`relative ${isGalleryOpen ? "opacity-10" : "opacity-100"}`}>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        {/* Main Image */}
        <div className="w-full hover:brightness-75 transition-all duration-200 self-stretch cursor-pointer" onClick={() => openGalleryModal(images[0].id)}>
          <Image className="object-contain rounded-lg" src={images[0].url} />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-3/4">
          <div className="lg:grid flex flex-row items-center lg:grid-cols-2 lg:grid-row-2 gap-4 justify-center w-full">
            {images.slice(1, 5).map((image, key) => (
              <div
                className=" flex justify-center items-center hover:brightness-75 transition-all duration-200 cursor-pointer"
                onClick={() => openGalleryModal(image.id)}
              >
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
    </div>
  );
};

const GalleryModal = ({ selectedImageId, images, close }) => {
  return (
    <div
      className=" w-[90%] absolute top-[40rem] lg:top-[25rem] left-[5%] z-10 bg-white md:p-6 border-8 border-primary rounded-md opacity-100"
      id="gallery"
    >
      <div className="relative ">
        <button
          className="absolute z-30 right-0 group bg-white rounded-md m-4"
          onClick={close}
        >
          <AiOutlineClose size={40} className="group-hover:text-red-600" />
        </button>
        <Swiper
          {...swiperConfig}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="h-full"
          initialSlide={images.findIndex((image) => image.id === selectedImageId)}
        >
          {images.map((image) => {
            return (
              <SwiperSlide
                key={image.id}
                className="flex justify-center items-center h-full"
              >
                <Image
                  className=" pointer-events-none object-cover md:aspect-auto h-screen md:h-full"
                  src={image.url}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
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
