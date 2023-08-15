import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


// Método POST
export async function POST(request) {
  console.log('La función POST ha sido llamada.');
  try {
    const body = await request.json();
    const { plate, brand, model, detail, year, price_per_day ,long_description} = body;

    if (!plate || !model || !price_per_day  ||  price_per_day <= 0) {
      return NextResponse.json({ error: 'Debes proporcionar la placa, modelo y un precio por día válido para el auto' }, { status: 400 });
    }

    const car = await prisma.vehicle.create({
      data: {
        plate,
        brand,
        model,
        detail,
        year,
        price_per_day,
        long_description,
      },
    });

    return NextResponse.json({ mensaje: 'Auto registrado exitosamente' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: 'Error al registrar el auto' }, { status: 500 });
  }
}

// Método GETALL
export async function GET() {
  console.log('La función GETALL ha sido llamada.');
  try {
    const cars = await prisma.vehicle.findMany();
    return NextResponse.json(cars, { status: 200, data: cars });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ mensaje: 'Error al obtener los autos' }, { status: 500 });
  }
}
