import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request) {
  console.log("La función GET ha sido llamada.");
  try {
    console.log(request);
    const urlParts = request.url.split("/");
    const plate = urlParts[urlParts.length - 1];
    if (!plate) {
      return NextResponse.json(
        { error: "Debes dar la placa del auto" },
        { status: 400 }
      );
    }

    const car = await prisma.vehicle.findUnique({
      where: {
        plate,
      },
      include: {
        category: true,
        specifications: true,
        images: true,
        model: {
          include: true,
          include: {
            brand: true,
          },
        },
      },
    });

    if (!car) {
      return NextResponse.json(
        { error: "No se encontró un auto con esa patente" },
        { status: 404 }
      );
    }

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: "Error al obtener el auto" },
      { status: 500 }
    );
  }
}

//METODO DELETE
export async function DELETE(request) {
  try {
    const urlParts = request.url.split("/");
    const plate = urlParts[urlParts.length - 1];
    if (!plate) {
      return NextResponse.json(
        { error: "Debes dar la placa del auto" },
        { status: 400 }
      );
    }

    const car = await prisma.vehicle.delete({
      where: {
        plate,
      },
    });

    return NextResponse.json(
      { message: "Auto eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: "Error al eliminar el auto" },
      { status: 500 }
    );
  }
}

// METODO PUT
export async function PUT(request) {
  console.log("La función PUT ha sido llamada.");
  try {
    console.log(request);
    const urlParts = request.url.split("/");
    const plate = urlParts[urlParts.length - 1];
    if (!plate) {
      return NextResponse.json(
        { error: "Debes proporcionar la placa del auto" },
        { status: 400 }
      );
    }

    const requestData = await request.json();

    if (
      !requestData.model ||
      !requestData.price_per_day ||
      requestData.price_per_day <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Debes proporcionar el modelo y un precio por día válido para actualizar el auto",
        },
        { status: 400 }
      );
    }

    const updatedCar = await prisma.vehicle.update({
      where: {
        plate,
      },
      data: requestData,
    });

    return NextResponse.json(updatedCar, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: "Error al modificar el auto" },
      { status: 500 }
    );
  }
}
