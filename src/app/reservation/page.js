// "use client"

// import { useState } from 'react';
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import "../globals.css"
// // import { useHistory } from 'react-router-dom';
// // import AvailableDates from "../AvailabilityCalendar";


// function ReservationPage() { 

//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;

//   // Lógica de reserva pendiente de implementación
//   return (
//     <div className="availability-calendar-container">
//         <div className="availability-calendar">
//             <div className="calendar-label" >
//                 <p className='mx-1'>
//                   Display of availability and busy dates:
//                 </p>

                
//                 <DatePicker className='px-calendar'
//                   // excludeDateIntervals={AvailableDates}
//                   selectsRange={true}
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(update) => {
//                     setDateRange(update);
//                   }}                  
//                   monthsShown={2}  
//                   isClearable={true}
//                   withPortal
//                   showIcon
//                   placeholderText="Select a date range"
//                 />                


                
//                 {/* <DatePicker                             
//                 // excludeDateIntervals={ AvailableDates}
//                 monthsShown={2}   
//                 inline               
//                 /> */}
//             </div>
//         </div>
//     </div>
//   );
// }
// export default ReservationPage;


"use client"

import { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useRouter } from 'next/router'; // Importa useRouter desde next/router
import "../globals.css";

function ReservationPage() { 
  const router = useRouter();
  const { dates } = router.query;

  // Inicializa availableDates como estado local
  const [availableDates, setAvailableDates] = useState([]);
  useEffect(() => {
    if (dates) {
      setAvailableDates(JSON.parse(dates));
    }
  }, [dates]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Lógica de reserva pendiente de implementación
  return (
    <div className="availability-calendar-container">
      <div className="availability-calendar">
        <div className="calendar-label">
          Display of availability and busy dates:
          <DatePicker
            excludeDateIntervals={availableDates} // Usa availableDates en lugar de AvailableDates
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
        </div>
      </div>
    </div>
  );
}

export default ReservationPage;
