"use client";
import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "@/components/context/UserContext";
import jwt from "jsonwebtoken";
import { Infinit } from "@/components/Infinit";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [response, setResponse] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const user = useContext(UserContext);

  const fetchUser = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    axios
      .post("/api/user", userData)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: res.data.msg,
        }).then(() => {
          const token = jwt.sign(res.data.user, "your-secret-key", {
            algorithm: "HS256",
          });
          user.loginUser(token);
          window.location.href = "/";
        });
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.response.data.error,
        });
      });
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    setResponse(null);
    setSubmitted(true);

    fetchUser();
  };

  return (
    <div className="flex  flex-col  bg-white justify-around">
      <div className="flex min-h-full flex-1 flex-col items-center px-6 py-12 lg:px-8">
        <Link href="/">
          <Infinit />
        </Link>

        <p className="text-lg sm:text-2xl worksans-regular mt-10 border-b-primary border-b-4 pb-2 ">
          Sign in to your account
        </p>

        <div className="mt-10 sm:mx-auto sm:w-full w-full sm:max-w-sm">
          <form action="" className="space-y-6" onSubmit={handleUserLogin}>
            <div className="flex flex-col">
              <label className="">Email address</label>
              <input
                type="text"
                className={`px-2 py-1.5 border-black border-2 rounded-md ${
                  submitted == true && userData.email === ""
                    ? "border-red-500"
                    : ""
                }`}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
              {submitted && userData.email === "" && (
                <p className="text-red-500">Email is required.</p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between flex-nowrap">
                <label className="flex-1 ">Password</label>
                <Link
                  href="/forgot-password"
                  className="flex-2 text-indigo-600 hover:text-indigo-500 "
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                className={`px-2 py-1.5 border-black border-2 rounded-md ${
                  submitted == true && userData.password === ""
                    ? "border-red-500"
                    : ""
                }`}
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
              {submitted && userData.password === "" && (
                <p className="text-red-500">Password is required.</p>
              )}
            </div>

            <button className="w-full hover:bg-primary shadow-md bg-black text-white transition all duration-300 font-medium text-white text-sm px-8 py-2 rounded-md">
              Sign in
            </button>
          </form>

          <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-4 w-full">
            <p>Or sign in with Google</p>
            <div className="md:block hidden">
              <GoogleLogin
                /*   onSuccess={showUserInformation} */
                onError={() => {
                  console.log("Login Failed");
                }}
                shape="pill"
                size="large"
                logo_alignment="left"
                text="signin_with"
                type="icon"
              />
            </div>
            <div className="md:hidden block ">
              <GoogleLogin
                onError={() => {
                  console.log("Login Failed");
                }}
                shape="pill"
                size="large"
                logo_alignment="left"
                text="signin_with"
                type="standard"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-10 text-sm flex-wrap ">
            <p className="text-gray-500 mr-2">Not a member?</p>
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Join and drive your way through the world!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
