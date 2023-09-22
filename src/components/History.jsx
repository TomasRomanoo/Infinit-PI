"use client"
import React from 'react';

const getLocationString = (vehicle) => {
  const dealer = vehicle?.dealer;
  if (dealer) {
    const address = dealer.address || 'N/A';
    const city = dealer.city || 'N/A';
    const state = dealer.state || 'N/A';
    return `${address}, ${city}, ${state}`;
  } else {
    return 'N/A, N/A, N/A';
  }
};

const History = ({ reservas }) => {
  console.log('Reservas:', reservas);

  return (
    <div>    
        <h1 className="flex flex-wrap justify-center mb-24 items-center text-2xl font-semibold h-[108px] bg-[#00243f] text-white">My Reservations</h1>
  
      <div className="gap-4 flex flex-row flex-wrap items-center justify-evenly mb-40">
        {Array.isArray(reservas) && reservas.map((reservation) => (
          <div
            key={reservation.idreservation}
            className="bg-white p-4 rounded shadow-lg flex flex-col flex-wrap content-start items-start h-[365px] w-[340px]"
          >
            <h2 className="text-xl font-semibold mb-2">
              Reserva ID: {reservation.idreservation}
            </h2>
            <div className="mb-2">
              <p className="font-semibold ">Reservator data:</p>
              <p>Name: {reservation.user?.first_name} {reservation.user?.last_name}</p>
              <p>Email: {reservation.user?.email}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold ">Reservation data:</p>
              <p className='bg-black text-white'>Start date: {new Date(reservation.checkin_date).toLocaleDateString()}</p>
              <p p className='bg-black text-white mt-1'>End date: {new Date(reservation.checkout_date).toLocaleDateString()}</p>
              <p>Location: {getLocationString(reservation.vehicle)}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Brand: {reservation.vehicle.model?.brand?.name || 'N/A'}</p>
              {reservation.vehicle.model ? (
                <div>
                  <p>Model: {reservation.vehicle.model.name || 'N/A'}</p>
                  <p>Year: {reservation.vehicle.year || 'N/A'}</p>
                  <p>Plate: {reservation.vehicle.plate || 'N/A'}</p>
                  <p>Price: ${reservation.vehicle.price_per_day || 'N/A'} per day</p>
                  <p>Detail: {reservation.vehicle.detail || 'N/A'}</p>
                  <p>Long Description: {reservation.vehicle.long_description || 'N/A'}</p>
                </div>
              ) : (
                <p>Model: N/A</p>
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-blue-500 font-semibold">
                Price: ${reservation.vehicle?.price_per_day || 'N/A'} per day
              </div>
              {reservation.vehicle?.images && reservation.vehicle?.images.length > 0 && (
                <img
                  src={reservation.vehicle?.images[0]?.url}
                  alt={reservation.vehicle?.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
