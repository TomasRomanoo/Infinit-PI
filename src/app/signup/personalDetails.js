"use client";

import React, { useState, useEffect } from "react";

export default function PersonalDetails({ onBack, onNext, data }) {
  const [firstName, setFirstName] = useState(data.firstName || "");
  const [lastName, setLastName] = useState(data.lastName || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [address, setAddress] = useState(data.address || "");
  const [city, setCity] = useState(data.city || "");
  const [zipCode, setZipCode] = useState(data.setZipCode || "");
  const [country, setCountry] = useState(data.country || "");
  const [countries, setCountries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ firstName, lastName, phone, address, country });
  };

  const isButtonDisabled =
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    phone.trim() === "" ||
    address.trim() === "";
  city.trim() === "";
  zipCode.trim() === "";

  country.selected;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        setCountries(data);
        console.log("countries :>> ", countries);
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="sm:mx-auto px-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="flex items-center justify-between w-full flex-wrap ">
            <div className="flex flex-col sm:w-[48%] w-full mb-6 sm:mb-0">
              <label>First Name</label>
              <input
                type="text"
                className="px-1 py-1.5 border-black border-2 rounded-md"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col sm:w-[48%] w-full">
              <label>Last Name</label>
              <input
                type="text"
                className="px-2 py-1.5 border-black border-2 rounded-md"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input
              type="text"
              className="px-2 py-1.5 border-black border-2 rounded-md"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Country</label>
            <select
              id="country"
              name="country"
              onChange={(e) => {
                setCountry(e.target.options[e.target.selectedIndex].value);
              }}
            >
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Address</label>
            <input
              type="text"
              className="px-2 py-1.5 border-black border-2 rounded-md"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>City</label>
            <input
              type="text"
              className="px-2 py-1.5 border-black border-2 rounded-md"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Zip Code</label>
            <input
              type="text"
              className="px-2 py-1.5 border-black border-2 rounded-md"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-8 mt-6">
          <button
            onClick={onBack}
            className="w-full shadow-md bg-black hover:bg-primary transition all duration-300 font-medium text-white text-sm px-8 py-2 rounded-md"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className={`w-full shadow-md transition-all duration-300 font-medium text-white text-sm px-8 py-2 rounded-md ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-primary cursor-pointer"
            }`}
            disabled={isButtonDisabled}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
