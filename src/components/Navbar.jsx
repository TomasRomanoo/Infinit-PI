"use client";

import Link from "next/link";
import React, { useState } from "react";

import { BiMenuAltLeft } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import {
  AiOutlineClose,
  AiOutlineCar,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { LiaKeySolid } from "react-icons/lia";

import { GoStack } from "react-icons/go";

export const Navbar = () => {
  const [user, isUserLogged] = useState(false);
  const [sideMenu, isSideMenuOpen] = useState(false);

  const openSidebar = () => {
    isSideMenuOpen(!sideMenu);

    document.querySelector("body").classList.add("no-scroll");
  };

  const closeSidebar = () => {
    if (sideMenu == true) {
      isSideMenuOpen(false);
      document.querySelector("body").classList.remove("no-scroll");
    }
    isSideMenuOpen(false);
  };

  return (
    <div
      className={`fixed top-0 p-6 lg:px-12 ${
        sideMenu ? "border-[1px]-black border-b" : "shadow-sm"
      } w-full bg-white`}
    >
      <div className="flex items-center justify-between">
        {sideMenu ? (
          <button className="block lg:hidden" onClick={closeSidebar}>
            <AiOutlineClose size={30} />
          </button>
        ) : (
          <button className="block lg:hidden" onClick={openSidebar}>
            <BiMenuAltLeft size={30} />
          </button>
        )}

        <div className="sm:block hidden">
          <Link href="">
            <p className="uppercase font-infinit tracking-widest text-2xl">
              Infinit
            </p>
          </Link>
        </div>
        <ul className="hidden lg:flex items-center gap-12 font-primary">
          <li className="text-lg link-item">
            <Link href="rent">Rent</Link>
          </li>
          <li className="text-lg link-item">
            <Link href="fleet">Fleet</Link>
          </li>
          <li className="text-lg link-item">
            <Link href="services">Services</Link>
          </li>
          <li className="text-lg link-item">
            <Link href="about">About</Link>
          </li>
        </ul>

        <div className="lg:block hidden  font-secondary">
          {user == false ? (
            <div className="flex items-center gap-8">
              <button className="p-6 py-3 rounded-md hover:bg-black bg-primary text-white transition-all duration-200 ease-in-out">
                Join now
              </button>
              <button className="p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out">
                Sign in
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <button className="p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out">
                Account
              </button>
              {user.role == "ADMIN" ? (
                <button className="p-6 py-3 rounded-md hover:bg-primary bg-black text-white transition-all duration-200 ease-in-out">
                  Dashboard
                </button>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex sm:hidden">
          <Link href="">
            <p className="uppercase font-infinit tracking-widest text-2xl">
              Infinit
            </p>
          </Link>
        </div>
      </div>

      {/* SIDE MENU */}

      <div
        className={`absolute top-[79px] bg-white lg:hidden w-[65%] ${
          sideMenu ? "left-0" : "-left-[100%]"
        } transition-all duration-300 ease-in-out border-r-2 border-b-2 z-10 flex flex-col justify-between py-6`}
      >
        <ul className="flex flex-col gap-8 font-secondary mt-4">
          <li className="font-bold p-4 w-full">
            <Link
              href="rent"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <LiaKeySolid size={25} />
              <p>Rent</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
              href="fleet"
              className="flex items-center gap-4 "
              onClick={closeSidebar}
            >
              <AiOutlineCar size={25} />
              <p>Fleet</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
              href="services"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <GoStack size={25} />
              <p>Services</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
              href="services"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <AiOutlineInfoCircle size={25} />
              <p>Why us?</p>
            </Link>
          </li>
        </ul>

        {user == false ? (
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 mx-4">
            <button
              onClick={closeSidebar}
              className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
            >
              <Link href="signup">Join now</Link>
            </button>
            <button
              onClick={closeSidebar}
              className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
            >
              <Link href="login">Sign in</Link>
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 mx-4">
            <button
              onClick={closeSidebar}
              className=" w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
            >
              <Link href="account">Account</Link>
            </button>
            {user.role == "ADMIN" ? (
              <button
                onClick={closeSidebar}
                className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
              >
                Dashboard
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
