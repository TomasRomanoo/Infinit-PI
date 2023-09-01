import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, context) {
  console.log("context.params.category :>> ", context.params.name);
  try {
    console.log("entra aca");
    const vehicles = await prisma.vehicle.findMany({
      where: {
        category: {
          name: context.params.name,
        },
      },
      include: {
        category: true,
        model: {
          include: {
            brand: true,
          },
        },
        images: true,
      },
    });

    console.log("vehicles :>> ", vehicles);

    return NextResponse.json(vehicles, { status: 200, data: vehicles });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: `Error getting vehicles by category name: ${error.message}`,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Error getting vehicles by category name" },
        { status: 500 }
      );
    }
  }
}


export async function DELETE(request) {
  try {
    const urlParts = request.url.split("/");
    const name = urlParts[urlParts.length - 1];
    if (!name) {
      return NextResponse.json(
        { error: "Debes proporcionar el nombre de la categoria" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Categoria no encontrada" },
        { status: 404 }
      );
    }

    await prisma.category.delete({
      where: {
        name,
      },
    });

    return NextResponse.json(
      { message: "Categoria eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: "Error al eliminar el categoria" },
      { status: 500 }
    );
  }
}
