// import { fileUploader } from "@/utils/uploadImage";
import { PrismaClient } from "@prisma/client";
import { message } from "antd";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


// Define la función `handler` que manejará las solicitudes HTTP a esta API
export async function GET() {
  // Verifica si la solicitud HTTP es de tipo GET    
    try {
      // Consulta la disponibilidad de vehículos en tu base de datos utilizando Prisma
        const vehicles = await prisma.vehicle.findMany({
        where: {
            deleted: false,
        },
        include: {
            images: true,
            model: {
                include: {
                brand: true,
                },
            },
        },
        // include: {
        //     availabilityPeriod: true, // Incluye los períodos de disponibilidad
        //     },
        });

      // Inicializa dos arreglos para almacenar las fechas disponibles y ocupadas
    //     const availableDates = [{message:"hola", date:"2015"}];
    //     const occupiedDates = [{message:"chau", date:"2017"}];

    //   // Itera sobre los vehículos obtenidos de la base de datos
    //     for (const vehicle of vehicles) {
    //     // Itera sobre los períodos de disponibilidad de cada vehículo
    //         for (const period of vehicle.availabilityPeriod) {
    //         // Convierte las fechas de inicio y fin del período en objetos Date
    //             const startDate = new Date(period.startDate);
    //             const endDate = new Date(period.endDate);
                
    //             // Agrega las fechas al arreglo correspondiente (disponibles u ocupadas)
    //             const currentDate = new Date(startDate);
    //             while (currentDate <= endDate) {
    //             // Verifica si la fecha actual ya está en el arreglo de fechas ocupadas
    //                 if (!occupiedDates.includes(currentDate.toISOString())) {
    //                 // Si no está en las fechas ocupadas, agrégala a las fechas disponibles
    //                 availableDates.push(currentDate.toISOString());
    //                 }
    //             // Avanza al siguiente día
    //             currentDate.setDate(currentDate.getDate() + 1);
    //             }
    //         }
    //     }

      // Responde con un código de estado 200 y un objeto JSON que contiene las fechas disponibles y ocupadas
        console.log("el metodo Get se esta ejecutando");
        return NextResponse.json({ vehicles, message:"esta todo OK" }, {status:200},);
    } catch (error) {
      // En caso de que ocurra un error, registra el error en la consola y responde con un código de estado 500 y un mensaje de error
        console.error("Error fetching availability: ", error);
        return NextResponse.json({ error: "Unable to fetch availability" },{status:500});
        }
    }


































// export async function GET() {
// }

// export default async function handler(req) {
//     if (req.method === "GET") {
//     try {
//       // Consulta la disponibilidad de vehículos en tu base de datos utilizando Prisma
//         const vehicles = await prisma.vehicle.findMany({
//         include: {
//           availabilityPeriod: true, // Incluye los períodos de disponibilidad
//         },
//         });

//       // Procesa los datos para obtener las fechas disponibles y ocupadas
//         const availableDates = [];
//         const occupiedDates = [];

//         for (const vehicle of vehicles) {
//             for (const period of vehicle.availabilityPeriod) {
//                 const startDate = new Date(period.startDate);
//                 const endDate = new Date(period.endDate);

//             // Agrega las fechas al arreglo correspondiente (disponibles u ocupadas)
//                 const currentDate = new Date(startDate);
//                 while (currentDate <= endDate) {
//                 if (!occupiedDates.includes(currentDate.toISOString())) {
//                     availableDates.push(currentDate.toISOString());
//                 }
//                 currentDate.setDate(currentDate.getDate() + 1);
//                 }
//             }
//         }

//         return NextResponse.json({ availableDates, occupiedDates });
//     } catch (error) {
//         console.error("Error fetching availability: ", error);
//         return NextResponse.json({ error: "Unable to fetch availability" });
//         }
//     } else {
//         return NextResponse.json({ error: "Method not allowed" });
//     }
// }