import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Método POST
export async function POST(request) {
  console.log("The POST function has been called.");
  try {
    const body = await request.json();
    const {
      plate,
      brand,
      model,
      detail,
      year,
      price_per_day,
      long_description,
    } = body;

    if (!plate || !model || !price_per_day || price_per_day <= 0) {
      return NextResponse.json(
        {
          error:
            "You must provide the license plate, model and a valid daily price for the vehicle",
        },
        { status: 400 }
      );
    }

    const car = await prisma.vehicle.create({
      data: {
        name: `${brand} ${model} ${year}`,
        plate,
        brand: {
          connect: { idbrand: brandId },
        },
        model: {
          connect: { idmodel: modelId },
        },
        category: {
          connect: { idcategory: categoryId },
        },
        specifications: {
          connect: { idspecification: specificationId },
        },
        detail,
        year,
        price_per_day,
        long_description,
      },
    });
    return NextResponse.json(
      { message: "Vehicle registered successfully", car },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: "Error" }, { status: 500 });
  }
}


// Método GETALL
export async function GET() {
  console.log("The GETALL function has been called.");
  try {
    const cars = await prisma.vehicle.findMany();
    return NextResponse.json(cars, { status: 200, data: cars });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting vehicles" },
      { status: 500 }
    );
  }
}