"use client";
import { CardList } from "@/components/CardList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function FleetByCategory({ params: { name } }) {
  const [vehiclesByCategory, setVehiclesByCategory] = useState([]);

  console.log("name :>> ", name);

  const fetchVehicles = async () => {
    const res = await axios(`/api/category/${name}`);
    console.log("res :>> ", res.data);

    setVehiclesByCategory(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div>
      <CardList vehicles={vehiclesByCategory} />
    </div>
  );
}
