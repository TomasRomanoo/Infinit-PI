const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Método POST
export async function POST(request) {
  console.log('La función POST ha sido llamada.');
  try {
    const body = await request.json();
    const { plate, model, detail, year, price_per_day } = body;

    if (!plate || !model || !price_per_day || isNaN(price_per_day) || price_per_day <= 0) {
      return new Response(JSON.stringify({ error: 'Debes proporcionar la placa, modelo y un precio por día válido para el auto' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const car = await prisma.vehicle.create({
      data: {
        plate,
        model,
        detail,
        year,
        price_per_day,
      },
    });

    return new Response(JSON.stringify({ mensaje: 'Auto registrado exitosamente' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ Error: 'Error al registrar el auto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}


// Método GETALL
export async function GET(request) {
  try {
    const cars = await prisma.vehicle.findMany();
    return new Response(JSON.stringify(cars), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ mensaje: 'Error al obtener los autos' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

