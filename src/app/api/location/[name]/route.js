import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, context) {
  console.log("The GET LOCATIONS BY NAME function has been called.");

  try {
    const { name } = context.params;
    console.log("name :>> ", name);
    if (!name) {
      return NextResponse.json(
        { message: "Location name is required" },
        { status: 400 }
      );
    }

    const locations = await prisma.checkout.findMany({
      where: {
        OR: [
          { address: { contains: name } },
          { city: { contains: name } },
          { country: { contains: name } },
        ],
      },
    });

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting locations" },
      { status: 500 }
    );
  }
}
