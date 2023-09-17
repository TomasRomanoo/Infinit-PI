"use client"

import axios from "axios";
import React, { useEffect, useState, useContext } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import UserDetails from "@/components/UserDetails";
import { UserContext } from "@/components/context/UserContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ReservationPage({params}) {

    const userContext = useContext(UserContext);
    let user = userContext.getUser()
    const [needsUpdate, setNeedsUpdate] = useState(false);
    
    const idvehicle= params.id
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [completeUser, setCompleteUser] = useState( {})
    const [dateError, setDateError] = useState("");

    const [AvailableDates, setAvailableDates] = useState();
    const MySwal = withReactContent(Swal)

    const fetchUser = async () => {
        if (user) {
            await axios.get(`/api/user/${user.email}`).then(function(response) {
                console.log(response.data)
                setCompleteUser(response.data)
                if (!response.data.first_name
                    || !response.data.last_name
                    || !response.data.phone
                    || !response.data.identification
                    || !response.data.address) {
                    setNeedsUpdate(true);
                }
            })
        }
    }

    const fetchAvailability = async () => {
        try {
            if (idvehicle) {
                const response = await axios(`/api/availability/${idvehicle}`);
                const powerRange = response.data.map((dateRange) => ({
                    start: new Date(dateRange.start.split("T")[0]),
                    end: new Date(dateRange.end.split("T")[0]),
                }));
                setAvailableDates(powerRange);
            }
        } catch (error) {
            console.error("Error fetching availability: ", error);

            Swal.fire({
                icon: 'error',
                title: 'Unable to fetch availability. Please try again later...',
            });
        }
    };

    useEffect(() => {
        fetchAvailability();
        fetchUser();
    }, []);

    const checkUserData = () => {
        console.log("update? : ", needsUpdate)
        if (needsUpdate) {
            MySwal.fire({
                title: <p>Please, check your data before continuing</p>,
                showCancelButton: false, // There won't be any cancel button
                showConfirmButton: false,
                html: (
                    <UserDetails
                        callback={handleReservationClick}
                        data={completeUser}
                        ready={MySwal.hideLoading}
                        loading={MySwal.showLoading}
                    ></UserDetails>
                ),
            }).then(() => {
                return MySwal.close();
            });
        } else {
            handleReservationClick();
        }
    };

    const handleReservationClick = () => {
        MySwal.close();
        setNeedsUpdate(false);
        if (!startDate || !endDate) {
            setDateError("Select a valid date range.");
            return;
        }
        setDateError("");
        let s = startDate.toISOString();
        let e = endDate.toISOString();
        window.location.href = `/reservation/${idvehicle}/confirm?start=${s}&end=${e}&user=${completeUser.first_name + ' ' + completeUser.last_name}&email=${completeUser.email}`;
    }
    
    return (
        <div className="availability-calendar-container">
            <div className="availability-calendar">
                <div className="calendar-label" >
                    <p className='mx-1'>
                    Display of availability and busy dates:
                        </p>                     

                        <DatePicker className='px-calendar'
                            excludeDateIntervals={AvailableDates}
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}   
                            minDate={new Date()}  
                            dateFormat="dd/MM/yyyy"             
                            monthsShown={2}  
                            isClearable={true}                  
                            showIcon
                            placeholderText="Select a date range"
                        />
                    <button className="bg-white text-black rounded-xl px-2 py-2 m-2"
                            onClick={checkUserData}>Continue
                    </button>
            
                </div>
            </div>
        </div>
    );
    }
export default ReservationPage;