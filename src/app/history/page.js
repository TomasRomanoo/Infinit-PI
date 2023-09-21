"use client"


import React, { useEffect, useState } from 'react';
import History from '@/components/History'; // Asegúrate de que la ruta sea correcta

const HistoryPage = () => {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    fetch('/api/reservations/3') // Asegúrate de que la ruta sea correcta
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.reservations)) {
          setReservas(data.reservations);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener datos de historial:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1></h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <History reservas={reservas} />
      )}
    </div>
  );
};

export default HistoryPage;
