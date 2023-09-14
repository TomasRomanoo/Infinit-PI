"use client"

import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function ReservationPage() { 

  // Lógica de reserva pendiente de implementación
  return (
    <div className="availability-calendar-container">
        <div className="availability-calendar">
            <div className="calendar-label">
            Display of availability and busy dates:
                
                <DatePicker                             
                // excludeDateIntervals={ AvailableDates}
                monthsShown={2}   
                inline                   
                
                />
            </div>
        </div>
    </div>
  );
}
export default ReservationPage;