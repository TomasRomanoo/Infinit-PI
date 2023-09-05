import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, context) {

  try {

    const vehicles = await prisma.vehicle.findMany({
      where: {
        category: {
          AND: [
            {
              name: context.params.name,
            },
            {
              deleted: false,
            },
          ],
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

    // const vehicles = await prisma.vehicle.findMany({
    //   where: {
    //     categoryIdcategory: category.idcategory,
    //   },
    // });


    // vehicles.map((vehicle) =>
    // prisma.vehicle.update({
    //   where: { idvehicle: vehicle.idvehicle },
    //   data: { categoryIdcategory: undefined },
    // })
    // )

    if (!category) {
      return NextResponse.json(
        { error: "Categoria no encontrada" },
        { status: 404 }
      );
    }

    // await prisma.category.delete({
    //   where: {
    //     name,
    //   },
    // });`

        await prisma.category.update({
      where: {
        idcategory: category.idcategory,
      },
      data:{
        deleted:true,
      }
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
