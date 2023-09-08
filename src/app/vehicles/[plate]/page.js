"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/swiper-bundle.min.css";

import { useRouter } from "next/navigation";
import Image from "next/image";

import mock from "@/assets/images/mock.png";
import peugeot from "@/assets/images/peugeot.jpg";
import peugeot2 from "@/assets/images/peugeot-2.jpg";
import peugeot3 from "@/assets/images/peugeot-3.jpg";
import peugeot4 from "@/assets/images/peugeot-4.jpg";
import peugeot5 from "@/assets/images/peugeot-5.jpg";

import { MdOutlineLocationOn, MdMyLocation } from "react-icons/md";
import { BiDirections } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import Calendar from "react-calendar";
import swiperConfig from "@/utils/swiperConfig";
import { Booking } from "@/components/Booking";
import Characterist from "./characterist";
import AvailabilityCalendar from "./AvailabilityCalendar";

const Detail = ({ params }) => {
  const [vehicle, setVehicle] = useState({});
  const router = useRouter();
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const handleShowMessage = (message) => {
    setMessageContent(message);
    setShowMessage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const fetchVehicle = async () => {
    const res = await axios("/api/vehicle/" + params.plate);
    //mocking images until DB is ready
    if (!res.data.images || !res.data.images.length) {
      res.data.images = [
        {
          url: peugeot
        },
        {
          url: peugeot2
        },
        {
          url: peugeot3
        },
        {
          url: peugeot4
        },
        {
          url: peugeot5
        },
      ]
    }
    setVehicle(res.data);

  };
  console.log("idVehicle>>", vehicle.idvehicle);

  useEffect(() => {
    fetchVehicle();
  }, []);

  const openGalleryModal = (imageId) => {
    setSelectedImageId(imageId);
    setGalleryOpen(true);
  };

  const closeGalleryModal = () => {
    setGalleryOpen(false);
  };
  return (
    <div >
      {isGalleryOpen && (
        <GalleryModal
          images={vehicle.images}
          close={closeGalleryModal}
          selectedImageId={selectedImageId}
        />
      )}
      <div
        className={`flex flex-col gap-4 ${isGalleryOpen ? "opacity-10" : "opacity-100"
          }`}
        id="detail"
      >
        <div className="flex items-center justify-between">
          <p className="text-2xl font-poppins font-semibold capitalize">{vehicle.model?.brand?.name + '  ' + vehicle.model?.name + '  ' + vehicle.plate}</p>
          {/* <button
            onClick={() => {
              router.back();
            }}
            // className="text-xl text-blue-700 hover:text-purple-600"
          >
            Go back
          </button> */}
        </div>

        <div className="bg-white rounded-lg w-full h-full shadow-lg py-8 p-4 md:px-12 space-y-8">
          {/* <Booking /> */}
          <AvailabilityCalendar idvehicle={vehicle.idvehicle} />
          <Gallery
            isGalleryOpen={isGalleryOpen}
            openGalleryModal={openGalleryModal}
            closeGalleryModal={closeGalleryModal}
            setSelectedImageId={setSelectedImageId}
            images={vehicle.images || []}
          />

          <Specs />
          <div className="flex flex-col items-start gap-6">
            <p className="text-poppins text-2xl mt-10">Description</p>

            <p className="text-gray-400 text-xl">{vehicle.long_description}</p>
          </div>

          <Characterist />


          <div class="flex justify-end">
            <button
              onClick={() => {
                router.back();
              }}
              // className="text-xl text-blue-700 hover:text-purple-600"
              className="w-1/6 bg-primary text-white p-4 rounded-md hover:bg-secondary transition-all duration-200"
            >
              Go back
            </button>
          </div>
          <div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleShowMessage(<div className="policy-list">
                  <div className="relative flex flex-col justify-center content-center" tabIndex="-1">
                    <button
                      onClick={() => setShowMessage(false)}
                      className=" absolute right-0 top-0"
                    >
                      <AiOutlineClose className="w-10 h-10" />
                    </button>
                    <h2 className="policy-title m-5">PRODUCT POLICES</h2>
                    <div
                      className=" p-5 flex flex-row flex-wrap justify-around"
                    >
                      <div className="policy">
                        <h3 className="policy-subtitle">Extended warranty:</h3>
                        <p className="policy-description">
                          High-end cars often come with an extended warranty that covers mechanical and electronic components for a longer period than standard vehicles. This can provide homeowners peace of mind and cover costly repairs.
                        </p>
                      </div>
                      <div className="policy">
                        <h3 className="policy-subtitle">Roadside Assistance Programs:  </h3>
                        <p className="policy-description">
                          High-end cars often come with roadside assistance programs that provide help in the event of problems such as a dead battery, flat tires, or the need to tow.
                        </p>
                      </div>
                      <div className="policy">
                        <h3 className="policy-subtitle">Genuine Parts Replacement Policy: </h3>
                        <p className="policy-description">
                          Some manufacturers offer service packages that cover regular maintenance for the first few years of ownership. This can include oil changes, inspections, and other maintenance tasks, making life easier for the owner and ensuring the vehicle is kept in top condition.
                        </p>
                      </div>
                      <div className="policy">
                        <h3 className="policy-subtitle">Access to Exclusive Events: </h3>
                        <p className="policy-description">
                          High-end car owners can receive invitations to exclusive events such as new model launches, track driving events, and other brand-related events.
                        </p>
                      </div>
                      <div className="policy">
                        <h3 className="policy-subtitle">Premium Customer Service:</h3>
                        <p className="policy-description">
                          High-end brands often offer a higher level of customer service, including more personalized treatment and access to dedicated service representatives.
                        </p>
                      </div>
                      <div className="policy">
                        <h3 className="policy-subtitle">Special Financing Programs:  </h3>
                        <p className="policy-description">
                          Some manufacturers offer preferential interest rates or exclusive financing programs for high-end vehicles.
                        </p>
                      </div>
                      <div className="policy">
                        <h3 className="policy-subtitle">Continuous Upgrade Program:  </h3>
                        <p className="policy-description">
                          In an effort to keep our high-end vehicles at the forefront of technology and performance, we offer a continuous upgrade program. This allows owners to trade in their current models for the latest versions with an attractive discount. We want you to always drive the latest and the best.
                        </p>
                      </div>
                      <div className="policy">
                        <h3 className="policy-subtitle">Exclusive Driving Experience:  </h3>
                        <p className="policy-description">
                          As the owner of a high-end luxury car from our brand, you will have exclusive access to unique driving experiences. This includes track driving events, exclusive scenic routes, and the opportunity to test drive our newest models before anyone else. We want you to fully enjoy your driving experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>)}
                className="w-36 bg-primary text-white p-4 rounded-md hover:bg-secondary transition-all duration-200 mx-auto  autoFocus"
              >
                Policy product
              </button>
            </div>
            {showMessage && (
              <>
              <div className=" fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-50 bg-black w-screen h-screen z-30" />
            
                <div
                  className=" absolute left-1/2 -translate-x-1/2 -top-1/2 translate-y-1/3 my-32 w-11/12 h-auto p-5 flex items-center justify-center  bg-white rounded-xl drop-shadow-lg  z-40"
                >
                  <div
                    className="w-full"
                  >
                    {messageContent}
                  </div>
                </div>
              </>
            )}
          </div >
        </div>
      </div>
    </div>
  );
};

const Gallery = ({
  isGalleryOpen,
  openGalleryModal,
  closeGalleryModal,
  images,
  setSelectedImageId,
}) => {
  return (
    <div className={`relative ${isGalleryOpen ? "opacity-10" : "opacity-100"}`}>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        {/* Main Image */}
        <div
          className="w-full hover:brightness-75 transition-all duration-200 self-stretch cursor-pointer"
          onClick={() => openGalleryModal(images[0]?.url)}
        >
          <Image
            className="object-contain rounded-lg"
            src={images[0]?.url}
            alt="spec"
          />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-3/4">
          <div className="lg:grid flex flex-row items-center lg:grid-cols-2 lg:grid-row-2 gap-4 justify-center w-full">
            {images?.slice(1, 5).map((image, key) => (
              <div
                className=" flex justify-center items-center hover:brightness-75 transition-all duration-200 cursor-pointer"
                onClick={() => openGalleryModal(image.id)}
              >
                <Image
                  key={key}
                  className=" rounded-lg object-contain"
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
      className=" w-[90%] absolute top-[40rem] lg:top-[25rem] left-[5%] z-10 bg-white md:p-2 rounded-md opacity-100"
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
          initialSlide={images.findIndex(
            (image) => image.id === selectedImageId
          )}
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
                  alt="spec"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

const Specs = ({ specifications }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row">
      {specifications?.map((spec, index) => {
        return (
          <div className="flex items-center gap-4" key={index}>
            <Image src={spec.image} alt="spec" />
            <p className="font-poppins text-lg">{spec.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Detail;
