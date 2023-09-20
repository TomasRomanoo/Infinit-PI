"use client"

import axios from "axios";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { UserContext } from "@/components/context/UserContext";
import { useContext } from "react";
import Image from "next/image";
import Success from "./success";
import { HiCalendarDays } from "react-icons/hi2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ConfirmationPage({ params }) {
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
    const vehicleId = params.id;

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

    function getMonthName(monthNumber) {
        var monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var monthIndex = monthNumber - 1;
        return monthNames[monthIndex];
    }

    let asd = 0
    function calculateDateDifference(date1, date2) {
        var dateObject1 = new Date(date1);
        var dateObject2 = new Date(date2);
        var differenceInMilliseconds = dateObject2 - dateObject1;
        var differenceInDays = (differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
        asd = differenceInDays
        return differenceInDays;
    }


    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img src={vehicle.images?.length > 1 ? vehicle.images[i]?.url : { i }} style={{ width: '100px', height: 'auto', objectFit: 'cover' }} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    return (
        <div>
            {saved === false ? (<div>
                <h1 className="m-5 text-3xl font-bold">Rental Confirmation</h1>
                <div className="shadow-lg p-10 bg-white rounded-xl">
                    <h2 className="m-5 text-xl">This is the last step. Check if the information is correct before confirming!</h2>
                    <div className="flex justify-around my-12">
                        <div className="w-5/12">
                            <div className="p-4 my-3" >
                                <h1 className="font-bold text-lg mb-2">Reservator data</h1>
                                <div>
                                    <div className="flex justify-between my-2">
                                        <p>Name: </p>
                                        <p>{reservator.name}</p>
                                    </div>
                                    <div className="flex justify-between my-2">
                                        <p>Email: </p>
                                        <p>{reservator.email}</p>
                                    </div>

                                </div>
                            </div>
                            <hr className="border-2 rounded" />
                            <div className="my-4">
                                <div className="p-4">
                                    <h1 className="font-bold text-lg mb-2" >Reservation data</h1>
                                    <div>
                                        <div className="my-4">
                                            <div className="flex justify-between my-2">
                                                <p>Location: </p>
                                                <p> {vehicle.dealer?.address + ', ' + vehicle.dealer?.city + ', ' + vehicle.dealer?.state}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className=" rounded border-2" />
                                <div className="flex w-full justify-around my-10">
                                    <div className="flex items-center" >
                                        <HiCalendarDays className="text-5xl text-primary" />
                                        <div className="ml-2 font-medium text-primary text-sm">
                                            <div className="opacity-60">From Date</div>
                                            <div className="font-bold opacity-80">
                                                <span>
                                                    {`${reservation.start.split("-")[2].split("T")[0]}`}
                                                </span>
                                                <span>
                                                    {` ${getMonthName(reservation.start.split("-")[1])}`}
                                                </span>
                                                <span>
                                                    {` ${reservation.start.split("-")[0]}`}
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                    <div class=" h-12 border-2 border-slate-300 self-center mx-2 rounded"></div>

                                    <div className="flex items-center mr-10 opacity-80" >
                                        <HiCalendarDays className="text-5xl text-primary" />
                                        <div className="ml-2 font-medium text-primary text-sm">
                                            <div className="opacity-60">To Date</div>
                                            <div className="font-bold opacity-80">
                                                <span>
                                                    {`${reservation.end.split("-")[2].split("T")[0]}`}
                                                </span>
                                                <span>
                                                    {` ${getMonthName(reservation.end.split("-")[1])}`}
                                                </span>
                                                <span>
                                                    {` ${reservation.end.split("-")[0]}`}
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className=" rounded border-2" />

                            <div className="flex flex-col my-5 items-center">
                                <p className="font-extrabold text-6xl text-primary my-5"> Total ${(calculateDateDifference(reservation.start, reservation.end)) * vehicle.price_per_day} </p>
                                <p className="text-slate-500"> (For {asd} days reserve)</p>
                            </div>

                            <div className="self-center">
                                        <button className="bg-primary text-white font-bold rounded-xl  w-full py-3 m-4"
                                            onClick={handleReservationClick}>   Confirm
                                        </button>
                                    </div>
                        </div>
                        <div className="w-5/12">
                            <div className=" flex flex-col rounded-xl" style={{boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.2)'}}>
                            
                                <div className="flex flex-col ">
                                    <div className="my-5 self-center font-bold text-xl tracking-wider">
                                        <p>{vehicle.model?.brand?.name.toUpperCase()} {vehicle.model?.name.toUpperCase()}</p>
                                    </div>
                                    <hr className="border-2 rounded w-4/5 self-center" />

                                    <div>
                                        <div className=" py-4 my-3 " >
                                            <div className="flex justify-evenly text-primary opacity-90">
                                                <div className="flex flex-col justify-between items-center my-2">
                                                    <p className="font-bold">Year:</p>
                                                    <p>{vehicle.year}</p>
                                                </div>
                                                <div className="flex flex-col justify-between items-center my-2">
                                                    <p className="font-bold">Plate:</p>
                                                    <p>{vehicle.plate}</p>
                                                </div>
                                                <div className="flex flex-col justify-between items-center my-2">
                                                    <p className="font-bold">Price:</p>
                                                    <p>${vehicle.price_per_day}<small className="text-xs">/day</small></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Slider {...settings} className="pb-20 " >
                                                {vehicle.images?.length > 1 && vehicle.images?.length > 1 && vehicle.images.map(image => {
                                                    return (<Image
                                                        className=""
                                                        width={550}
                                                        height={400}
                                                        src={image.url}
                                                        alt="spec"
                                                    />)
                                                })}
                                            </Slider>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>)
                :
                <Success />}
        </div>
    );
}
export default ConfirmationPage;