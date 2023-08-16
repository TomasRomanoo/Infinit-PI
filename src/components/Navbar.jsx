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

import { BsNut } from "react-icons/bs";
import { GoStack } from "react-icons/go";
import { Infinit } from "./Infinit";

export const Navbar = () => {
  const [user, isUserLogged] = useState(false);
  const [sideMenu, isSideMenuOpen] = useState(false);
  const [MngmntOpen, isMngmntOpen] = useState(false);
  const [MngmntMobileOpen, isMngmntMobileOpen] = useState(false);

  const openSidebar = () => {
    isSideMenuOpen(!sideMenu);

    document.querySelector("body").classList.add("no-scroll");
    document
      .querySelector("#home")
      .classList.add("sidebar-open-background-behind");
  };

  const closeSidebar = () => {
    if (sideMenu == true) {
      isSideMenuOpen(false);
      document.querySelector("body").classList.remove("no-scroll");
      document
        .querySelector("#home")
        .classList.remove("sidebar-open-background-behind");
    }
    isSideMenuOpen(false);
  };

  const managementClick = () => {
    if (!MngmntOpen) {
      isMngmntOpen(true);
      document.querySelector("#mngmnt").classList.remove("hide-mngmnt");
      document.querySelector("#mngmnt").classList.add("show-mngmnt");
    } else {
      isMngmntOpen(false);
      document.querySelector("#mngmnt").classList.add("hide-mngmnt");
      document.querySelector("#mngmnt").classList.remove("show-mngmnt");
    }
  };

  const managementClickMobile = () => {
    if (!MngmntMobileOpen) {
      isMngmntMobileOpen(true);
      document.querySelector("#modal").classList.remove("hide-mngmnt");
      document.querySelector("#modal").classList.add("show-mngmnt-mobile");

      document.querySelector("#modalBg").classList.remove("hide-mngmnt");
      document.querySelector("#modalBg").classList.add("show-mngmnt-mobile");
    } else {
      isMngmntMobileOpen(false);
      document.querySelector("#modal").classList.add("hide-mngmnt");
      document.querySelector("#modal").classList.remove("show-mngmnt-mobile");

      document.querySelector("#modalBg").classList.add("hide-mngmnt");
      document.querySelector("#modalBg").classList.remove("show-mngmnt-mobile");
    }
    closeSidebar();
  };

  return (
    <div
      className={`fixed top-0 p-6 pb-0 lg:px-12 ${
        sideMenu ? "border-[1px]-black border-b" : "shadow-sm"
      } w-full bg-white z-30 `}
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
          <Link href="/">
            <Infinit />
          </Link>
        </div>
        <ul className="hidden lg:flex items-center gap-12 font-poppins">
          <li className="text-lg link-item">
            <Link href="/rent">Rent</Link>
          </li>
          <li className="text-lg link-item">
            <Link href="/fleet">Fleet</Link>
          </li>
          <li className="text-lg link-item">
            <Link href="/services">Services</Link>
          </li>
          <li className="text-lg link-item">
            <Link href="/about">About</Link>
          </li>
          <li className="">
            <div className="relative  ">
              <button
                onClick={managementClick}
                type="button"
                className="inline-flex items-center gap-x-1 text-lg link-item "
                aria-expanded="false"
              >
                <span>Management</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div id="mngmnt" className="hide-mngmnt">
                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 group-hover:text-indigo-600"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>
                      <Link href={"/dashboard"} onClick={managementClick}>
                        <div>
                          <button className="font-semibold text-gray-900">
                            Add Car
                            <span className="absolute inset-0"></span>
                          </button>
                          <p className="mt-1 text-gray-600">
                            You can rent your car here{" "}
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 group-hover:text-indigo-600"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.867 19.125h.008v.008h-.008v-.008z"
                          />
                        </svg>
                      </div>
                      <div>
                        <button className="font-semibold text-gray-900">
                          Your rented cars
                          <span className="absolute inset-0"></span>
                        </button>
                        <p className="mt-1 text-gray-600">
                          Here you can delete, modify and view analytics{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div className="lg:block hidden font-poppins">
          {user == false ? (
            <div className="flex items-center gap-8">
              <button className="p-6 py-3 rounded-md bg-primary hover:bg-secondary shadow-lg text-white transition-all duration-200 ease-in-out">
                <Link href={"/signup"}>Join now</Link>
              </button>
              <button className="p-6 py-3 rounded-md bg-primary hover:bg-secondary shadow-md text-white  transition-all duration-200 ease-in-out">
                <Link href={"/login"}>Sign in</Link>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <button className="p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out">
                <Link href={"/account"}>Account</Link>
              </button>
              {user.role == "ADMIN" ? (
                <button className="p-6 py-3 rounded-md hover:bg-primary bg-black text-white transition-all duration-200 ease-in-out">
                  <Link href={"/dashboard"}>Dashboard</Link>
                </button>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex sm:hidden">
          <Link href="/">
            <Infinit />
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
              href="/rent"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <LiaKeySolid size={25} />
              <p>Rent</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
              href="/fleet"
              className="flex items-center gap-4 "
              onClick={closeSidebar}
            >
              <AiOutlineCar size={25} />
              <p>Fleet</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
              href="/services"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <GoStack size={25} />
              <p>Services</p>
            </Link>
          </li>
          <li className="font-bold p-4  w-full cursor-pointer ">
            <div
              className="flex items-center gap-4"
              onClick={managementClickMobile}
            >
              <BsNut size={25} />
              <p>Management</p>
            </div>
            {/* </Link> */}
          </li>
          <li className="font-bold p-4  w-full ">
            <Link
              href="/services"
              className="flex items-center gap-4"
              onClick={closeSidebar}
            >
              <AiOutlineInfoCircle size={25} />
              <p>Why us?</p>
            </Link>
          </li>
        </ul>

        {user == false ? (
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 mx-4 font-poppins">
            <button
              onClick={closeSidebar}
              className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
            >
              <Link href="/signup">Join now</Link>
            </button>
            <button
              onClick={closeSidebar}
              className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
            >
              <Link href="/login">Sign in</Link>
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 mx-4 font-poppins">
            <button
              onClick={closeSidebar}
              className=" w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
            >
              <Link href="/account">Account</Link>
            </button>
            {user.role == "ADMIN" ? (
              <button
                onClick={closeSidebar}
                className="w-full p-6 py-3 rounded-md hover:bg-primary bg-black text-white  transition-all duration-200 ease-in-out"
              >
                <Link href={"/dashboard"}>Dashboard</Link>
              </button>
            ) : null}
          </div>
        )}
      </div>
      {/* MODAL FOR MOBILE ENGAGEMENT */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity hide-mngmnt lg:hidden"
        id="modalBg"
      ></div>
      <div
        className="flex min-h-full justify-center items-center p-0 fixed inset-0 hide-mngmnt lg:hidden"
        id="modal"
      >
        <div className="relative">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-indigo-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <Link href={"/dashboard"} onClick={managementClickMobile}>
                  <div>
                    <div className="font-semibold text-gray-900">Add Car</div>
                    <p className="mt-1 text-gray-600">
                      You can rent your car here{" "}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-indigo-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Your rented cars
                  </div>
                  <p className="mt-1 text-gray-600">
                    Here you can delete, modify and view analytics{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  );
};
