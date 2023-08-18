import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET({ id }) {
  console.log("The GET VEHICLES BY CATEGORY ID function has been called.");
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        categoryId: id,
      },
      include: {
        category: true,
        model: true,
        images: true,
      },
    });

    return NextResponse.json(vehicles, { status: 200, data: vehicles });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting vehicles by category ID" },
      { status: 500 }
    );
  }
}
