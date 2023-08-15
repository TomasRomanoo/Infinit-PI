"use client";

import React, { useState } from "react";
import { Form } from "@/components/Form";
import { Toaster } from "sonner";

import {
  AiOutlineClose,
  AiOutlineCar,
  AiOutlinePlus,
  AiTwotoneDelete,
} from "react-icons/ai";

import { FaPencilAlt } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { Infinit } from "@/components/Infinit";

const Dashboard = () => {
  const [form, setForm] = useState(false);
  const [deleteVehicles, setDeleteVehicles] = useState(false);

  const renderComponent = (option) => {
    setForm();
  };

  return (
    <div className="flex items-center justify-evenly h-full">
      <Sidebar renderComponent={renderComponent} />
      <div className="lg:w-4/6 w-full pt-10 mb-10 lg:mx-10 h-auto rounded-2xl shadow-md font-poppins content-around flex-col bg-white">
        <Toaster position="bottom-right" richColors expand={false} />
        <p className="flex flex-col justify-center items-center text-2xl pb-6">
          Dashbaord
        </p>
        {form && <Form />}
        {deleteVehicles && <DeleteVehicles />}
      </div>
    </div>
  );
};

const Sidebar = ({ renderComponent }) => {
  return (
    <>
      <div className="w-[200px] ml-12  bg-primary h-full rounded-lg">
        <ul className="flex flex-col gap-2 font-secondary mt-4">
          <li className="font-bold p-4  w-full ">
            <button className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <AiOutlineCar size={25} />
              <p>Fleet</p>
            </button>
          </li>
          <li className="font-bold p-4  w-full ">
            <button
              className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  "
              onClick={() => {
                renderComponent(true);
              }}
            >
              <AiOutlinePlus size={25} />
              <p>New car</p>
            </button>
          </li>
          <li className="font-bold p-4  w-full ">
            <button className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <AiTwotoneDelete size={25} />
              <p>Delete</p>
            </button>
          </li>
          <li className="font-bold p-4  w-full ">
            <button className="flex items-center gap-4 text-black bg-white w-full p-4 rounded-lg  ">
              <FaPencilAlt size={25} />
              <p>Modify a car</p>
            </button>
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

export default Dashboard;
