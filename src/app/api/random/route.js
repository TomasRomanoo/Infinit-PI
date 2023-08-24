import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const productsCount = await prisma.vehicle.count();
    const skip = Math.floor(Math.random() * productsCount);
    
    const products = await prisma.vehicle.findMany({
      take: 4,
      skip: skip,
      orderBy: {
        sellingCount: 'desc',
      },
    });

    return NextResponse.json(vehicle, { status: 200, data: vehicle });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error getting products" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
