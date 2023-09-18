"use client"

import axios from "axios";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { UserContext } from "@/components/context/UserContext";
import {useContext} from "react";
import Image from "next/image";
import Success from "./success";

function ConfirmationPage({params}) {
    const userContext = useContext(UserContext);
    let user = userContext.getUser()
    const searchParams = useSearchParams()
    const [vehicle, setVehicle] = useState({})
    const [reservator, setReservator] = useState({
        name: searchParams.get('user'),
        email: searchParams.get('email')
    })
    const [reservation, setReservation] = useState({
        start: searchParams.get('start'),
        end: searchParams.get('end')
    })
    const [saved, setSaved] = useState(false)
    const vehicleId= params.id;

    useEffect(() => {
        fetchVehicle()
    }, []);

    const fetchVehicle = async () => {
        const res = await axios("/api/vehicle/" + vehicleId);
        setVehicle(res.data);
    }

    const handleReservationClick = () => {
        const body = {
            userId: user.id,
            vehicleId: vehicleId,
            startDate: searchParams.get("start"),
            endDate: searchParams.get("end")
        }
        axios
            .post("/api/reservation", body)
            .then((res) => {
                console.log("res :>> ", res);
                setSaved(true)
            })
            .catch((error) => {
                console.log("error :>> ", error);
            });
    }
    
    return (
        <div>
            {saved === false && (<div className="">
                <h1>Vehicle data</h1>
                <div className="flex-row flex lg:flex-row items-center justify-center w-full gap-4">
                    {/* Main Image */}
                    <div className="w-full hover:brightness-75 transition-all duration-200 self-stretch flex-column">
                        <Image
                            className="object-contain rounded-lg"
                            width={500}
                            height={500}
                            src={vehicle.images?.length > 1 ? vehicle.images[1]?.url : ""}
                            alt="spec"
                        />
                    </div>
                    <div className="items-right flex-column">
                        <p>Brand: {vehicle.model?.brand?.name}</p>
                        <p>Model: {vehicle.model?.name}</p>
                        <p>Year: {vehicle.year}</p>
                        <p>Plate: {vehicle.plate}</p>
                    </div>
                </div>
                <p/>
                <h1>Reservator data</h1>
                <div className="flex flex-col lg:flex-row w-full gap-4">
                    <div className="">
                        <p>Name: {reservator.name}</p>
                        <p>Email: {reservator.email}</p>
                    </div>
                </div>
                <p/>
                <h1>Reservation data</h1>
                <div className="flex flex-col lg:flex-row w-full gap-4">
                    <div className="">
                        <p>Start date: {reservation.start.split("T")[0]}</p>
                        <p>End date: {reservation.end.split("T")[0]}</p>
                        <p>Location: {vehicle.dealer?.address + ', ' + vehicle.dealer?.city + ', ' + vehicle.dealer?.state}</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4">
                    <button className="bg-white text-black rounded-xl px-2 py-2 m-2"
                            onClick={handleReservationClick}>Confirm
                    </button>
                </div>
            </div>)}
            {saved === true && <Success />}
        </div>
    );
    }
export default ConfirmationPage;