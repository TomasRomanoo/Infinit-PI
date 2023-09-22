"use client"


import React, { useEffect, useState } from 'react';
import History from '@/components/History'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';

const HistoryPage = ({params}) => {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const userID= params.id
  console.log("userID>>>", userID);

  const fetchHistory = ()=> {


    fetch('/api/reservations/'+userID) // Asegúrate de que la ruta sea correcta
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
      
      // try{
      // const reservations = await axios.get(`/api/reservations/${userID}`)// Asegúrate de que la ruta sea correcta
            
      //     setReservas(reservations.data);         
            
      //     setIsLoading(false);
      // }catch(error) {
      //     console.error('Error al obtener datos de historial:', error);
      //     setIsLoading(false);
      // }

  }
  useEffect(() => {
      fetchHistory()    
  }, [userID]);
  console.log("reservas>>>", reservas);

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
