"use client"

import axios from "axios";
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
// import "/front/equipo-03/src/app/globals.css"

function ReservationPage({params}) {  
    
    const idVechicle= params.id
    console.log("idVechicle>>>"+ idVechicle);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [AvailableDates, setAvailableDates] = useState();

    const fetchAvailability = async () => {
    try {
        if (idVechicle) {
        const response = await axios(`/api/availability/${idVechicle}`);
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
    }, []); 
    
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

                    
            
                </div>
            </div>
        </div>
    );
    }
export default ReservationPage;