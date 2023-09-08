import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { startDate, endDate } = body;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { message: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        dealer: {
          city: { equals: body.city }, 
        },
        reservation: {
          none: {
            AND: [
              { checkout_date: { gte: new Date(startDate) } },
              { checkin_date: { lte: new Date(endDate) } },
            ],
          },
        },
      },
    });

    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting vehicles" },
      { status: 500 }
    );
  }
}
