import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getUserByEmail } from "../../auth/database";
const prisma = new PrismaClient();

export async function GET( request ) {
    console.log("The GET USER BY EMAIL function has been called.");

    console.log(request.url);
    try {
        const urlParts = request.url.split("/");
        const email = urlParts[urlParts.length - 1];

            const user = await prisma.user.findUnique({
                where: {
                email: email,
                },
            });

        return NextResponse.json(user, { status: 200, data: user });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error getting user by email" },
            { status: 500 }
        );
    }
}
