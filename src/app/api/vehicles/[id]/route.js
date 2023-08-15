import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request) {
  console.log("La función GET ha sido llamada.");
  try {
    console.log(request);
    const urlParts = request.url.split("/");
    const id = urlParts[urlParts.length - 1];
    if (!id) {
      return NextResponse.json(
        { error: "Debes dar el id del auto" },
        { status: 400 }
      );
    }

    const car = await prisma.vehicle.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      return NextResponse.json(
        { error: "No se encontró un auto con ese id" },
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

export async function DELETE(request) {
  try {
    const urlParts = request.url.split("/");
    const id = urlParts[urlParts.length - 1];
    if (!id) {
      return NextResponse.json(
        { error: "Debes dar el id del auto" },
        { status: 400 }
      );
    }

    const car = await prisma.vehicle.delete({
      where: {
        id,
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
