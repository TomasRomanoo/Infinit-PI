"use client";
import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function ReservasHistorial() {
  const [reservation, setReservation] = useState([]); // Cambio de 'reservas' a 'reservation'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReservas() {
      try {
        const userReservas = await prisma.reservation.findMany({
          where: {
            userIduser: 4, // Reemplaza con el ID real del usuario autenticado
          },
          include: {
            vehicle: true,
          },
          orderBy: {
            checkin_date: 'desc', // Ordena por fecha de check-in descendente.
          },
        });

        setReservation(userReservas); // Cambio de 'setReservas' a 'setReservation'
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    }

    // Llama a la función para cargar las reservas cuando el componente se monta.
    fetchReservas();
  }, []);

  return (
    <div>
      <h1>Mi Historial de Reservas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {reservation.map((reservation) => (
            <li key={reservation.idreservation}>
              <strong>Fecha de Check-in:</strong> {reservation.checkin_date}<br />
              <strong>Fecha de Check-out:</strong> {reservation.checkout_date}<br />
              <strong>Vehículo:</strong> {reservation.vehicle.name}<br />
              {/* Otros detalles de la reserva si los tienes en tu modelo de datos */}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReservasHistorial;
