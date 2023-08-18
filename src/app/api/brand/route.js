import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  console.log("The POST function has been called.");
  try {
    const body = await request.json();
    const { name } = body;

    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "Brand registered successfully", brand },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}

export async function GET() {
    console.log("The GETALL function has been called.");
    try {
      const brands = await prisma.brand.findMany();
      return NextResponse.json(brands, { status: 200, data: brands });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error getting brands" },
        { status: 500 }
      );
    }
  }
  