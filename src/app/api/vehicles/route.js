import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


// Método POST
export async function POST() {
  console.log('La función POST ha sido llamada.');
  try {
    const body = await request.json();
    const { plate, brand, model, detail, year, price_per_day ,long_description} = body;

    if (!plate || !model || !price_per_day  ||  price_per_day <= 0) {
      return NextResponse.json({ error: 'Debes proporcionar la placa, modelo y un precio por día válido para el auto' }, { status: 400 });
    }

    const car = await prisma.vehicle.create({
      data: {
        plate,
        brand,
        model,
        detail,
        year,
        price_per_day,
        long_description,
      },
    });

    return NextResponse.json({ mensaje: 'Auto registrado exitosamente' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: 'Error al registrar el auto' }, { status: 500 });
  }
}

// Método GETALL
export async function GET() {
  try {
    const cars = await prisma.vehicle.findMany();
    return NextResponse.json(cars, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ mensaje: 'Error al obtener los autos' }, { status: 500 });
  }
}


// Método PUT
// export async function PUT(request) {
//   try {
//     const { id } = request.params;
//     const body = await request.json();
//     const { plate,brand, model, detail, year, price_per_day, long_description } = body;

//     if (!id) {
//       return NextResponse.json({ mensaje: 'Debes proporcionar el ID del auto a editar' }, { status: 400 });
//     }

//     if (!plate || !model  || price_per_day !== 'number' || price_per_day <= 0) {
//       return NextResponse.json({ error: 'Debes proporcionar la placa, modelo y precio por día válido para el auto' }, { status: 400 });
//     }

//     const updatedCar = await prisma.vehicle.update({
//       where: {
//         idvehicle: parseInt(id),
//       },
//       data: {
//         plate,
//         brand,
//         model,
//         detail,
//         year,
//         price_per_day,
//         long_description
//       },
//     });

//     if (!updatedCar) {
//       return NextResponse.json({ Error: 'Auto no encontrado' }, { status: 404 });
//     }

//     return NextResponse.json({ mensaje: 'Auto editado exitosamente' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ Error: 'Error al editar el auto' }, { status: 500 });
//   }
// }

// Método DELETE
// export async function DELETE(request) {
//   try {
//     const { id } = request.params;

//     if (!id) {
//       return NextResponse.json({ mensaje: 'Debes proporcionar el ID del auto a eliminar' }, { status: 400 });
//     }

//     const deletedCar = await prisma.vehicle.delete({
//       where: {
//         idvehicle: parseInt(id),
//       },
//     });

//     if (!deletedCar) {
//       return NextResponse.json({ mensaje: 'Auto no encontrado' }, { status: 404 });
//     }

//     return NextResponse.json({ mensaje: 'Auto eliminado exitosamente' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ Error: 'Error al eliminar el auto' }, { status: 500 });
//   }
// }