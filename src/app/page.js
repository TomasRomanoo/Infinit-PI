"use client";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import bluecar from "@/assets/images/blue-car.jpg";
<<<<<<< HEAD
import honda from "@/assets/images/honda-civic.png";

=======
>>>>>>> 60c2ca3faea7b372880e0abb8221de753ccd54be
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Booking } from "@/components/Booking.jsx";
import {CardList} from "@/components/CardList";


export default function Home() {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const res = await axios("http://localhost:3000/api/vehicles");

    setVehicles(res.data.slice(0, 10));
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
      {/* SE MIGRO EL COMPONENTE FLETTCARROUSEL A CARDLIST */}
      {/* <FleetCarousel vehicles={vehicles} /> */} 
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
                          // SE MIGRO FLEETCARROUSEL AL COMPONENTE CARDLIST

// const FleetCarousel = ({ vehicles }) => {
//   const [isLoading, setIsLoading] = useState(true); // Add a loading state
//   const container = {
//     // ... existing container animation properties ...
//   };

//   useEffect(() => {
//     const loadingTimeout = setTimeout(() => {
//       setIsLoading(false); // Set loading to false after the timeout
//     }, 2000); // Adjust the timeout duration as needed

//     return () => {
//       clearTimeout(loadingTimeout); // Clear the timeout if the component unmounts
//     };
//   }, []);

//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="show"
//       className="flex flex-col items-center mt-20"
//     >
//       <p className="font-poppins text-4xl mb-2 text-center">
//         Take a look to our fleet
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-12 w-full">
//         {isLoading
//           ? // Display skeleton cards while loading
//             Array.from({ length: 4 }).map((_, index) => (
//               <div key={index}>
//                 <SkeletonCard />
//               </div>
//             ))
//           : // Render actual vehicle cards

//             vehicles.map((vehicle, index) => (
//               <div key={index}>
//                 <motion.div
//                   initial={{
//                     x: -300,
//                     opacity: 0,
//                   }}
//                   whileInView={{
//                     x: 0,
//                     opacity: 1,
//                     transition: {
//                       duration: 0.5,
//                       ease: "easeOut",
//                     },
//                   }}
//                   viewport={{ once: true }}
//                 >
                  
//                   <Card vehicle={vehicle} />
//                 </motion.div>
//               </div>              
//             ))}
//       </div>      
      
        
//     </motion.div>  
//   );
// };
