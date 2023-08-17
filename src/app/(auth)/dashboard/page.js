"use client";

import React, { useState } from "react";

import {
  AiOutlineClose,
  AiOutlineCar,
  AiOutlinePlus,
  AiTwotoneDelete,
} from "react-icons/ai";

import { FaPencilAlt } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <div className="w-[200px] ml-12  bg-primary h-full rounded-lg">
        <ul className="flex flex-col gap-2 font-secondary mt-4">
          <li className="font-bold p-4  w-full ">
            <Link
            href="/dashboard/[path]" 
            as="/dashboard/fleet"
            className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <AiOutlineCar size={25} />
              <p>Fleet</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link 
            href="/dashboard/[path]" 
            as="/dashboard/add"
              className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  "
            >
              <AiOutlinePlus size={25} />
              <p>New car</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
            href="/dashboard/[path]" 
            as="/dashboard/delete"
            className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <AiTwotoneDelete size={25} />
              <p>Delete</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
            href="/dashboard/[path]" 
            as="/dashboard/modify"
            className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <FaPencilAlt size={25} />
              <p>Modify a car</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <button className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <SiGoogleanalytics size={25} />
              <p>Analytics</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
