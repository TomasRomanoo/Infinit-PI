"use client";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Card } from "@/components/Card";

import bluecar from "@/assets/images/blue-car.jpg";
import honda from "@/assets/images/honda-civic.png";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import swiperConfig from "../utils/swiperConfig.ts";

export default function Home() {
  const vehicles = [
    {
      name:`Honda Civic 2017`,
      brand: "Honda",
      model: "Civic",
      year: 2017,
      price_per_day: 30.5,
      image: honda,
      specs: {
        ppl_capacity: 5,
        range: 500,
        luggage_capacity: 3,
        transmission: "AUT.",
        air_conditioner: true,
        abs: true,
        heated_seats: true,
      },
    },
    {
      brand: "Honda",
      model: "Accord",
      year: 2018,
      price_per_day: 35.0,
      image: honda,
      specs: {
        ppl_capacity: 5,
        range: 520,
        luggage_capacity: 4,
        transmission: "AUT.",
        air_conditioner: true,
        abs: true,
        heated_seats: true,
      },
    },
    {
      brand: "Honda",
      model: "CR-V",
      year: 2020,
      price_per_day: 40.25,
      image: honda,
      specs: {
        ppl_capacity: 5,
        range: 550,
        luggage_capacity: 5,
        transmission: "CVT",
        air_conditioner: true,
        abs: true,
        heated_seats: false,
      },
    },
    {
      brand: "Honda",
      model: "Pilot",
      year: 2019,
      price_per_day: 45.75,
      image: honda,
      specs: {
        ppl_capacity: 8,
        range: 480,
        luggage_capacity: 6,
        transmission: "AUT.",
        air_conditioner: true,
        abs: true,
        heated_seats: true,
      },
    },
    {
      brand: "Honda",
      model: "Fit",
      year: 2021,
      price_per_day: 28.0,
      image: honda,
      specs: {
        ppl_capacity: 5,
        range: 450,
        luggage_capacity: 2,
        transmission: "CVT",
        air_conditioner: true,
        abs: true,
        heated_seats: false,
      },
    },
    {
      brand: "Honda",
      model: "Odyssey",
      year: 2019,
      price_per_day: 50.0,
      image: honda,
      specs: {
        ppl_capacity: 7,
        range: 420,
        luggage_capacity: 7,
        transmission: "AUT.",
        air_conditioner: true,
        abs: true,
        heated_seats: true,
      },
    },
    {
      brand: "Honda",
      model: "HR-V",
      year: 2022,
      price_per_day: 37.5,
      image: honda,
      specs: {
        ppl_capacity: 5,
        range: 480,
        luggage_capacity: 4,
        transmission: "CVT",
        air_conditioner: true,
        abs: true,
        heated_seats: true,
      },
    },
    {
      brand: "Honda",
      model: "Ridgeline",
      year: 2020,
      price_per_day: 55.0,
      image: honda,
      specs: {
        ppl_capacity: 5,
        range: 450,
        luggage_capacity: 5,
        transmission: "AUT.",
        air_conditioner: true,
        abs: true,
        heated_seats: false,
      },
    },
    {
      brand: "Honda",
      model: "Insight",
      year: 2021,
      price_per_day: 33.25,
      image: honda,
      specs: {
        ppl_capacity: 5,
        range: 600,
        luggage_capacity: 3,
        transmission: "CVT",
        air_conditioner: true,
        abs: true,
        heated_seats: true,
      },
    },
    {
      brand: "Honda",
      model: "Clarity",
      year: 2022,
      price_per_day: 48.75,
      image: honda,
      specs: {
        ppl_capacity: 5,
        range: 520,
        luggage_capacity: 4,
        transmission: "CVT",
        air_conditioner: true,
        abs: true,
        heated_seats: true,
      },
    },
  ];



  return (
    <div id="" className="">
      <Hero />
      <FleetCarousel vehicles={vehicles} />
      <Footer />
    </div>
  );
}

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center gap-8">
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
        className="flex flex-col max-w-md gap-4 "
      >
        <p className="text-6xl font-bold font-secondary">
          <span className="tracking-widest ">INFINIT</span> Wheels,{" "}
          <span className="text-tertiary">Infinite</span> Journeys: Your Drive,
          Your Story.
        </p>
        <p>
          We provide the best cars for you to build your own story on wheels.
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.2 },
        }}
        className="w-full lg:w-[35%]"
      >
        <Image src={bluecar} className="rounded-xl" />
      </motion.div>
    </div>
  );
};

const FleetCarousel = ({ vehicles }) => {
  const container = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 3,
        delayChildren: 4,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center mt-20"
    >
      <p className="font-poppins text-4xl mb-2 text-center">
        Take a look to our fleet
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-12">
        {vehicles.map((vehicle, index) => {
          return (
            <>
              <div className="">
                <motion.div
                  initial={{
                    x: -300,
                    opacity: 0,
                  }}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  }}
                  viewport={{ once: true }}
                  key={index}
                >
                  <Card vehicle={vehicle} />
                </motion.div>
              </div>
            </>
          );
        })}
      </div>
    </motion.div>
  );
};
