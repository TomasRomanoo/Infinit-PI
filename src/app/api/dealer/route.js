import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { city, startDate, endDate } = body;

    console.log(body);

    if (!city || !startDate || !endDate) {
      return NextResponse.json(
        {
          error:
            "Debes proporcionar la ciudad, fecha de inicio y fecha de finalización",
        },
        { status: 400 }
      );
    }

    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    console.log("llega aca");

    const carsInCityAndDateRange = await prisma.vehicle.findMany({
      where: {
        dealer: {
          city,
        },
        availabilityPeriod: {
          some: {
            startDate: {
              gte: formattedStartDate,
            },
            endDate: {
              lte: formattedEndDate,
            },
          },
        },
      },
      include: {
        category: true,
        specifications: true,
        images: true,
        model: {
          include: {
            brand: true,
          },
        },
        dealer: true,
        availabilityPeriod: true,
      },
    });

    if (!carsInCityAndDateRange.length) {
      return NextResponse.json(
        {
          error:
            "No se encontraron autos en esa ciudad para el rango de fechas proporcionado",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(carsInCityAndDateRange, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los autos" },
      { status: 500 }
    );
  }
}
