import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function POST(request) {
    console.log("The POST RATING function has been called.");
    try {
        const urlParts = request.nextUrl.pathname.split("/");
        const userId = urlParts[3]
        const vehicleId = urlParts[5]

        const body = await request.json();
        const { rate, date, description } = body;

        const rating = await prisma.rating.create({
            data: {
                iduser: parseInt(userId),
                idvehicle: parseInt(vehicleId),
                rate,
                date,
                description
            },
        });
        return NextResponse.json(
            { message: "Rating registered successfully", rating },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Error: "Error" }, { status: 500 });
    }
}