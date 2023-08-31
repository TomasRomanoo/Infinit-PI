
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET({id}) {
    
    try {
        console.log(`GET ${id} parameters`);        

        // traigo la info de la base de datos
        const availability = await prisma.reservation.findMany({
            where:{vehicleIdvehicle : id} 
        });

        // aca traigo las fechas en que el auto se reserva
        const entryDates = availability.map(item => ({
            idreservation: item.idreservation,
            checkin_date: item.checkin_date,
            checkout_date: item.checkout_date
        })); 

    
        console.log("el metodo Get2 se esta ejecutando",id);
        return NextResponse.json( entryDates,{ status: 200, message: "Todo está OK" });
    } catch (error) {
      // En caso de que ocurra un error, registra el error en la consola y responde con un código de estado 500 y un mensaje de error
        console.error("Error fetching availability: ", error);
        return NextResponse.json({ error: "Unable to fetch availability" },{status:500});
        }
    }
