"use client";
import Image from "next/image";
import bluecar from "@/assets/images/blue-car.jpg";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Booking } from "@/components/Booking.jsx";
import {CardList} from "@/components/CardList";


export default function Home() {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const res = await axios("http://localhost:3000/api/vehicles");

    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div id="" className="">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      >
        <Booking />
      </motion.div>
      <Hero />      
      <div className="">
        <CardList vehicles={vehicles}/>
      </div>
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
