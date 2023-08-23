"use client";
import { CardList } from "@/components/CardList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function FleetByCategory() {
  const [vehiclesByCategory, setVehiclesByCategory] = useState([]);

  const currentPage = usePathname();

  const urlString = currentPage;
  const parts = urlString.split("/");
  const lastPart = parts[parts.length - 1];

  console.log('lastPart :>> ', lastPart);

  const fetchVehicles = async () => {
    const res = await axios(`/api/category`, {lastPart});
    console.log('res :>> ', res.data);


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
