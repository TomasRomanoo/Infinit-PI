"use client";
import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function ReservasHistorial() {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una demora de 1 segundo para cargar los datos.
    setTimeout(async () => {
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

        setReservas(userReservas);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    }, 1000);
  }, []);

  return (
    <div>
      <h1>Mi Historial de Reservas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.idreservation}>
              <strong>Fecha de Check-in:</strong> {reserva.checkin_date}<br />
              <strong>Fecha de Check-out:</strong> {reserva.checkout_date}<br />
              <strong>Vehículo:</strong> {reserva.vehicle.name}<br />
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
