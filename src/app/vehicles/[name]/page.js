"use client";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Detail = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col mx-20 gap-4">
      <div className="flex items-center justify-start">
        <button
          onClick={() => {
            router.back();
          }}
          className="text-xl text-blue-700 hover:text-purple-600"
        >
          Go back
        </button>
      </div>

      <div className="bg-white rounded-lg w-full h-screen shadow-lg p-12">

          <Gallery/>

      </div>
    </div>
  );
};

const Gallery = () => {
  const images = [
    { id: 1, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 2, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 3, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 4, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 5, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 6, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 7, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 8, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 9, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 10, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 11, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 12, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
    { id: 13, url: "https://via.placeholder.com/3840x2160?text=Mockup" },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Image */}
        <Image src={images[0].url}/>
    </div>
  );
};

export default Detail;
