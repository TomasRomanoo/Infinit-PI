import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AvailabilityCalendar = () => {
  const [availability, setAvailability] = useState({
    availableDates: [],
    occupiedDates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/availability")
      .then((res) => {
        setAvailability({
          availableDates: res.data.availableDates,
          occupiedDates: res.data.occupiedDates,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching availability: ", error);
        setError("Unable to fetch availability. Please try again later.");
        setLoading(false);
      });
  }, []);

  const highlightDates = (date) => {
    const isAvailable = availability.availableDates.some((availableDate) =>
      isSameDay(availableDate, date)
    );
    const isOccupied = availability.occupiedDates.some((occupiedDate) =>
      isSameDay(occupiedDate, date)
    );

    return {
      available: isAvailable && !isOccupied,
      occupied: isOccupied,
    };
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const [startDateAvailable, setStartDateAvailable] = useState(null);
  const [startDateOccupied, setStartDateOccupied] = useState(null);

  return (
    <div className="availability-calendar-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="availability-calendar">
          <div className="calendar-label">Available Dates:</div>
          <DatePicker
            selected={startDateAvailable}
            onChange={(date) => setStartDateAvailable(date)}
            dateFormat="dd/MM/yyyy"
            filterDate={highlightDates}
            minDate={new Date()}
            className="availability-calendar-picker"
          />
        </div>
      )}
      <div className="availability-calendar">
        <div className="calendar-label">Occupied Dates:</div>
        <DatePicker
          selected={startDateOccupied}
          onChange={(date) => setStartDateOccupied(date)}
          dateFormat="dd/MM/yyyy"
          filterDate={highlightDates}
          minDate={new Date()}
          className="availability-calendar-picker"
        />
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
