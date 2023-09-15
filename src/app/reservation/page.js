"use client"

import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "../globals.css"
// import { useHistory } from 'react-router-dom';
// import AvailableDates from "../AvailabilityCalendar";


function ReservationPage() { 

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Lógica de reserva pendiente de implementación
  return (
    <div className="availability-calendar-container">
        <div className="availability-calendar">
            <div className="calendar-label" >
                <p className='mx-1'>
                  Display of availability and busy dates:
                </p>

                
                <DatePicker className='px-calendar'
                  // excludeDateIntervals={AvailableDates}
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}                  
                  monthsShown={2}  
                  isClearable={true}
                  withPortal
                  showIcon
                  placeholderText="Select a date range"
                />                


                
                {/* <DatePicker                             
                // excludeDateIntervals={ AvailableDates}
                monthsShown={2}   
                inline               
                /> */}
            </div>
        </div>
    </div>
  );
}
export default ReservationPage;