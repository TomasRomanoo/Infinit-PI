import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
// import { DatePicker } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AvailabilityCalendar = ({idvehicle}) => {
  const [dateRange, setDateRange] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  
  const fetchAvailibity = async () => {
    let PowerRange = null;
    if (idvehicle) {
      PowerRange = await axios(`/api/availability/${idvehicle}`)
      console.log(PowerRange)
    }

    return PowerRange
  }

  useEffect(() => {
    fetchAvailibity()
  }, []);

  

  return (
    <div className="availability-calendar-container">
      <div className="availability-calendar">
        <div className="calendar-label">Select Dates:</div>
        <DatePicker
          selected={dateRange}
          onChange={(date) => setDateRange(date)}          
          // highlightDates={[
          //   { start: new Date("2023-09-02"), end: new Date("2023-09-07") },
          //   { start: new Date("2023-09-29"), end: new Date("2023-10-05")}
          // ]}
          excludeDateIntervals={ fetchAvailibity()}               
          monthsShown={2}          
          withPortal
          placeholderText="Dates available"
        />
      </div>
    </div>
  );
};

export default AvailabilityCalendar;













// import React, { useEffect, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// import { DatePicker } from "antd";
// import { DateRange } from "@mui/icons-material";
// const AvailabilityCalendar = ({params}) => {
//   const [availability, setAvailability] = useState({
//     availableDates: [],
//     occupiedDates: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("/api/availability/"+params)
//       .then((res) => {
//         // Parseo de fechas
//         const availableDates = res.data
//           .filter((item) => item.checkin_date !== "1970-01-01")
//           .map((item) => new Date(item.checkin_date));
//         const occupiedDates = res.data
//           .filter((item) => item.checkin_date !== "1970-01-01")
//           .map((item) => new Date(item.checkin_date));

//         setAvailability({
//           availableDates,
//           occupiedDates,
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching availability: ", error);
//         setError("Unable to fetch availability. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   const highlightDates = (date) => {
//     const isAvailable = availability.availableDates.some((availableDate) =>
//       isSameDay(availableDate, date)
//     );
//     const isOccupied = availability.occupiedDates.some((occupiedDate) =>
//       isSameDay(occupiedDate, date)
//     );

//     return {
//       available: isAvailable && !isOccupied,
//       occupied: isOccupied,
//     };
//   };

//   const isSameDay = (date1, date2) => {
//     return (
//       date1.getDate() === date2.getDate() &&
//       date1.getMonth() === date2.getMonth() &&
//       date1.getFullYear() === date2.getFullYear()
//     );
//   };

//   const [startDateAvailable, setStartDateAvailable] = useState(null);
//   const [startDateOccupied, setStartDateOccupied] = useState(null);

//   return (
//     <div className="availability-calendar-container">
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div className="availability-calendar">
//           <div className="calendar-label">Available Dates:</div>
//           <DatePicker
//             selected={startDateAvailable}
//             onChange={(date) => setStartDateAvailable(date)}
//             dateFormat="dd/MM/yyyy"
//             filterDate={highlightDates}
//             minDate={new Date()}
//             className="availability-calendar-picker"
//           />
//         </div>
//       )}      
//     </div>
//   );
// };

// export default AvailabilityCalendar;



// import React, { useState } from "react";
// import { DatePicker } from "antd";

// const AvailabilityCalendar = () => {
//   const [dateRange, setDateRange] = useState();

//   const handleSelect = (range) => {
//     setDateRange(range);
//   };

//   // Ejemplo de datos de disponibilidad (hardcodeado)
//   const availableDates = [
//     new Date("2023-08-31"),
//     new Date("2023-09-01"),
//     new Date("2023-09-02"),
//     new Date("2023-09-03"),
//     new Date("2023-09-04"),
//     new Date("2023-09-05"),
//   ];

//   const disabledDates = [
//     new Date("2023-09-02"),
//     new Date("2023-09-03"),
//   ];

//   const highlightDates = (date) => {
//     const isAvailable = availableDates.some((availableDate) =>
//       isSameDay(availableDate, date)
//     );
//     const isDisabled = disabledDates.some((disabledDate) =>
//       isSameDay(disabledDate, date)
//     );

//     return {
//       available: isAvailable && !isDisabled,
//       disabled: isDisabled,
//     };
//   };

//   const isSameDay = (date1, date2) => {
//     return (
//       date1.getDate() === date2.getDate() &&
//       date1.getMonth() === date2.getMonth() &&
//       date1.getFullYear() === date2.getFullYear()
//     );
//   };

//   return (
//     <div className="availability-calendar-container">
//       <div className="availability-calendar">
//         <div className="calendar-label">Select Dates:</div>
//         <DatePicker
//           value={dateRange}
//           onSelect={handleSelect}
//           minimumDate={new Date()}
//           highlightDate={highlightDates}
//         />
//       </div>
//     </div>
//   );
// };

// export default AvailabilityCalendar;
