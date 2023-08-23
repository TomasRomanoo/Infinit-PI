import Image from "next/image";
import React, { useState } from "react";

import image from "@/assets/images/honda-civic.png";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { toast } from "sonner";

export const ModCar = ({ vehicles, firstIndex, lastIndex }) => {
  const apiUrl = "http://localhost:3000/api/vehicles/";
  const [showModal, setShowModal] = useState(false);

  const handlerModal = (vehicle, plate) => {
    axios.get(`/api/vehicle/${plate}`).then(function(response){
      setId(response.data.idvehcle)
      setBrand(response.data.model.brand.name)
      setModel(response.data.model.name)
      setPrice(response.data.price_per_day)
      setPlate(response.data.plate)
      setYear(response.data.year)
      setDetail(response.data.detail)
      setDescription(response.data.long_description)
    })

    // setId(vehicle.idvehcle);
    // setBrand(vehicle.brand);
    // setModel(vehicle.model);
    // setPrice(vehicle.price_per_day);
    // setPlate(vehicle.plate);
    // setYear(vehicle.year);
    // setDetail(vehicle.detail);
    // setDescription(vehicle.long_description);

    setShowModal(!showModal);
  };

  //* Controled inputs states
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [detail, setDetail] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  //* Error States
  const [priceErr, setPriceErr] = useState(false);
  const [plateErr, setPlateErr] = useState(false);
  const [yearErr1, setYearErr1] = useState(false);
  const [yearErr2, setYearErr2] = useState(false);
  const [detailErr, setDetailErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);

  const handlerEdit = (e) => {
    e.preventDefault();

    const fields = [
      { state: price, setter: setPriceErr, id: "#priceInput" },
      { state: plate, setter: setPlateErr, id: "#plateInput" },
      { state: detail, setter: setDetailErr, id: "#detailInput" },
      { state: category, setter: categoryErr, id: "#categoryInput" },
      {
        state: description,
        setter: setDescriptionErr,
        id: "#descriptionInput",
      },
    ];

    fields.forEach((field) => {
      if (!field.state) {
        field.setter(true);
        document.querySelector(field.id).classList.add("errInput");
      } else {
        field.setter(false);
        document.querySelector(field.id).classList.remove("errInput");
      }
    });

    if (!year || year.length === 0 || year > 2023 || year < 1886) {
      setYearErr1(!year || year.length === 0);
      setYearErr2((year > 2023 || year < 1886) && year != 0);
      document.querySelector("#yearInput").classList.add("errInput");
    } else {
      setYearErr1(false);
      setYearErr2(false);
      document.querySelector("#yearInput").classList.remove("errInput");
    }

    if (
      year &&
      year.length !== 0 &&
      year < 2023 &&
      year > 1886 &&
      fields[4].state &&
      fields[3].state &&
      fields[2].state &&
      fields[1].state &&
      fields[0].state
    ) {
      toast.success("Todo ok");
      // toast.promise(
      //   axios.put(apiUrl, {
      //     idvehicle:id,
      //     plate: plate,
      //     brand: brand,
      //     model: model,
      //     detail: detail,
      //     year: +year,
      //     price_per_day: +price,
      //     long_description: description,
      //   }),
      //   {
      //     loading: "Loading...",
      //     success: (data) => {
      //       return `Edit has been successfully`;
      //     },
      //     error: "Error while editing",
      //   }
      // );
      setShowModal(!showModal);
    }
  };

  return (
    <>
      {vehicles
        .map((vehicle) => {
          return (
            <div className=" w-2/5  m-3 rounded-2xl overflow-hidden shadow-md flex flex-col font-poppins hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between p-4">
                <div className="w-1/2">
                  <Image
                    className="w-full object-contain"
                    src={image}
                    alt="mod-car"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-start gap-1 font-bold text-lg">
                    <p className="text-start truncate ">{vehicle.model.brand.name}</p>
                    <p>{vehicle.model.name}</p>
                  </div>
                  <p className="text-gray-400 font-semibold">{vehicle.year}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="ml-4">
                  <span className="font-semibold">
                    ${vehicle.price_per_day}
                  </span>
                  <span className="text-gray-400">/day</span>
                </p>
                <button
                  className="bg-green-400 font-semibold text-white px-8 py-3 rounded-tl-2xl hover:bg-black transition-all duration-300 ease-in-out"
                  onClick={() => handlerModal(vehicle, vehicle.plate)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })
        .slice(firstIndex, lastIndex)}

      {/* ------------------------------- EDIT MODAL ------------------------------- */}
      <div
        className={`fixed inset-0 z-30 bg-gray-500 bg-opacity-75 transition-opacity ${
          showModal ? "flex" : "hidden"
        }`}
        id="modalBg"
      ></div>
      <div
        id="modal"
        className={` z-50 min-h-full justify-center items-center p-0 fixed inset-0  ${
          showModal ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-col m-5 px-10 pt-5 max-w-2xl flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <button
            className="p-4 self-end"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <GrClose />
          </button>

          <form
            noValidate
            onSubmit={handlerEdit}
            className="flex items-center flex-col "
          >
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div className="">
                <div className="m-[0.85rem]  ">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Brand
                  </label>

                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="brandInput"
                      type="text"
                      value={brand}
                      readOnly
                      className="block w-full cursor-pointer rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                    ></input>
                  </div>

                  <span className="flex items-center font-medium tracking-wide text-gray-300 text-xs mt-1 ml-1">
                    * This camp can't be modified
                  </span>
                </div>

                <div className="m-3">
                  <label className="block  text-sm font-medium leading-6 text-gray-900">
                    Model
                  </label>
                  <div>
                    <input
                      id="modelInput"
                      value={model}
                      readOnly
                      type="text"
                      className="block mt-2 w-full cursor-pointer rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                    ></input>
                  </div>

                  <span className="flex items-center font-medium tracking-wide text-gray-300 text-xs mt-1 ml-1">
                    * This field can't be moddified
                  </span>
                </div>

                <hr className="mt-5 mb-5" />

                <div className="m-3">
                  <label
                    for="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price per day
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="priceInput"
                      type="number"
                      value={price}
                      onChange={() => setPrice(event.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label className="sr-only">Currency</label>
                      <select className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                        <option>USD</option>
                        <option>ARS</option>
                        <option>EUR</option>
                      </select>
                    </div>
                  </div>
                  {priceErr ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      The price can't be blank
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <hr className="mt-5 mb-5" />

                <div className="m-3  ">
                  <label className="block mb-2 text-sm font-medium leading-6 text-gray-900">
                    Upload multiple photos
                  </label>
                  <div>
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        multiple
                        type="file"
                        cursor-pointer
                        className=" text-xs block w-full  text-gray-500 pr-2
                                    ring-2 ring-gray-300 ring-inset rounded-md
                                    file:mr-1 file:py-2 file:px-2
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-white
                                    hover:file:bg-secondary file:transition-all duration-200 ease-in-out
                                    "
                      />
                    </label>
                  </div>
                  {/* 
                            {modelErr?                             
                            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                The model can't be blank    
                            </span> : <></>} */}
                </div>
              </div>

              <div>
                <div className="m-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Plate
                  </label>
                  <div>
                    <input
                      id="plateInput"
                      value={plate}
                      onChange={() => setPlate(event.target.value)}
                      type="text"
                      className="block mt-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                    />
                  </div>
                  {plateErr ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Invalid plate
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="m-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Year
                  </label>
                  <div>
                    <input
                      id="yearInput"
                      type="number"
                      min="1886"
                      max="2023"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="block mt-2 w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                    />
                  </div>
                  {yearErr1 ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      The year can't be blank
                    </span>
                  ) : (
                    <></>
                  )}
                  {yearErr2 ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Invalid year
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="m-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Detail
                  </label>
                  <div className="w-full max-w-sm mx-auto">
                    <textarea
                      id="detailInput"
                      className=" block mt-2 h-full w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                      placeholder="Enter your car's detail here"
                      value={detail}
                      onChange={() => setDetail(event.target.value)}
                    ></textarea>
                  </div>

                  {detailErr ? (
                    <span className="flex  items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      The details can't be blank
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="m-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Long Description
                  </label>
                  <div className="w-full max-w-sm mx-auto">
                    <textarea
                      className=" w-full mt-2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                      id="descriptionInput"
                      placeholder="Enter your description here"
                      value={description}
                      onChange={() => setDescription(event.target.value)}
                    ></textarea>
                  </div>
                  {descriptionErr ? (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      The description can't be blank
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                
                
                <div className="m-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                  </label>
                <select
                  id="categoryInput"
                  value={category}
                  onChange={(e) => {
                    setModel(e.target.value);
                    console.log("category :>> ", category);
                  }}
                  type="text"
                  className="block mt-2 w-full cursor-pointer rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6 transition ease-in-out duration-300"
                >
                  <option value="" disabled selected>
                    Select some category
                  </option>
                  {/* {brand.models.map((model) => {
                    return (
                      <option value={model.idmodel} key={model.idmodel}>
                        {model.name}
                      </option>
                    );
                  })} */}
                </select>
              </div>
                

              </div>
            </div>

            <div className="m-5 mb-8 ">
              <button className="rounded-xl py-3 px-5 w-full text-white bg-primary hover:bg-secondary file:transition-all duration-200 ease-in-out">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
