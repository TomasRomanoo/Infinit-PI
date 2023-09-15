
// import axios from "axios";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Swal from 'sweetalert2';

// const AvailabilityCalendar = ({idvehicle}) => {
//   const [dateRange, setDateRange] = useState();  
//   const [AvailableDates, setAvailableDates] = useState()
//   const [isError, setIsError] = useState(false)

//   const fetchAvailability = async () => {
//     try {
//       if (idvehicle) {
//         const response = await axios(`/api/availability/${idvehicle}`);
//         console.log("res.data",response.data);        
//         const powerRange = response.data.map((dateRange) => ({
          
//           start: new Date(dateRange.start.split("T")[0]), 
//           end: new Date(dateRange.end.split("T")[0]),     
          
//         }));
//         setAvailableDates(powerRange); 
//         setIsError(false)       
//       }    
//       } catch (error) {
//           console.error("Error fetching availability: ", error);          
//           setIsError(true)

//           Swal.fire({
//             icon: 'error',
//             title: 'Unable to fetch availability. Please try again later...',            
//           });
//         }         
//   } 
//   useEffect(() => {
//     fetchAvailability()   
//   }, [idvehicle]); 
//   console.log("Availability dates", AvailableDates);
  
//   return (
//     <div className="availability-calendar-container">
//       <div className="availability-calendar">
//         <div className="calendar-label">
//           Display of availability and busy dates:
//           {
//             isError ? 
//               <p className="bg-white text-gray-400 w-60 rounded-lg mt-2 py-2 px-3  ">
//               Please try again later...
//               </p>
//             :
//             <DatePicker                              
//             excludeDateIntervals={ AvailableDates}
//             monthsShown={2}
//             withPortal          
//             showIcon         
//             placeholderText="Show availability"
//             />            
//           } 
                    
//           <Link href={`/reservation`}>            
//             Reservation
//           </Link>
          
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AvailabilityCalendar;



import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
// import { UserContext } from "./UserContext";
import { UserContext } from "@/components/context/UserContext";


const AvailabilityCalendar = ({ idvehicle }) => {
  
  const { user } = useContext(UserContext);

  const [dateRange, setDateRange] = useState();
  const [AvailableDates, setAvailableDates] = useState();
  const [isError, setIsError] = useState(false);

  const fetchAvailability = async () => {
    try {
      if (idvehicle) {
        const response = await axios(`/api/availability/${idvehicle}`);
        const powerRange = response.data.map((dateRange) => ({
          start: new Date(dateRange.start.split("T")[0]),
          end: new Date(dateRange.end.split("T")[0]),
        }));
        setAvailableDates(powerRange);
        setIsError(false);
      }
    } catch (error) {
      console.error("Error fetching availability: ", error);
      setIsError(true);

      Swal.fire({
        icon: 'error',
        title: 'Unable to fetch availability. Please try again later...',
      });
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [idvehicle]);

  const handleReservationClick = () => {
    // Verificar si el usuario está autenticado utilizando el contexto de usuario
    if (user) {
      return (
        <Link href="/reservation">
          Reservation
        </Link>
      );
    } else {
      return (
        <Link href="/signup">
          Sign Up
        </Link>
      );
    }
  };

  return (
    <div className="availability-calendar-container">
      <div className="availability-calendar">
        <div className="calendar-label">
          Display of availability and busy dates:
          {isError ? (
            <p className="bg-white text-gray-400 w-60 rounded-lg mt-2 py-2 px-3">
              Please try again later...
            </p>
          ) : (
            <DatePicker
              excludeDateIntervals={AvailableDates}
              monthsShown={2}
              withPortal
              showIcon
              placeholderText="Show availability"
            />
          )}
          <button onClick={handleReservationClick}>Reservation</button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
