import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React,{ useEffect, useState } from "react";
import image from "@/assets/images/honda-civic.png"
import { Pagination } from "./Pagination";
import { motion } from "framer-motion";
import { SkeletonCard } from "@/components/Skeleton.jsx";
import { Card } from "./Card";




export const CardList = ({vehicles}) => {

    console.log("prop vehicles: ",vehicles);

    const [isLoading, setIsLoading] = useState(true);
    const container = {
    // ... existing container animation properties ...
    };


    const [products,setProducts] = useState([])
    const [productsPerPage,setProductsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after the timeout
    }, 2000); // Adjust the timeout duration as needed

    return () => {
      clearTimeout(loadingTimeout); // Clear the timeout if the component unmounts
    };
    }, []);
    return (
        <>
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center mt-20"
            >
            <p className="font-poppins text-4xl mb-2 text-center">
                Take a look to our fleet
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-12 w-full">
                {isLoading
                ? // Display skeleton cards while loading
                    Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                        <SkeletonCard />
                    </div>
                    ))
                : // Render actual vehicle cards

                    vehicles.map((vehicle, index) => (
                    <div key={index}>
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
                        >
                        
                        <Card vehicle={vehicle} />
                        </motion.div>
                    </div>              
                    ))}
            </div>  
                
        </motion.div> 
        <div className="mt-10 ">
            <Pagination currentPage={currentPage} productsPerPage={productsPerPage} />
        </div>
        </>
        
    )
}

