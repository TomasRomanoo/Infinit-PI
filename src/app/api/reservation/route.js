import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Método POST
export async function POST(request) {
  console.log("The POST function has been called.");
  try {
    const body = await request.json();

    console.log('body :>> ', body);

    const user = await prisma.user.findUnique({
      where: { iduser: body.userId },
    });
    if (!user) {
      return NextResponse.json(
          { error: "Invalid user selected" },
          { status: 404 }
      );
    }
    const vehicle = await prisma.vehicle.findUnique({
      where: { idvehicle: parseInt(body.vehicleId) },
    });
    if (!vehicle) {
      return NextResponse.json(
          { error: "Invalid vehicle selected" },
          { status: 404 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        user: {
          connect: { iduser: body.userId },
        },
        vehicle: {
          connect: { idvehicle: parseInt(body.vehicleId) },
        },
        checkin_date: body.startDate,
        checkout_date: body.endDate,
      },
    });

    return NextResponse.json(
      { message: "Reservation registered successfully", reservation },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}
