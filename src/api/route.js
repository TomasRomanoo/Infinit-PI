const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Método POST
export async function POST(request) {
  try {
    const body = await request.json();
    const { plate, model, detail, year, price_per_day, long_description, short_description, brand_idbrand, category_idcategory, review_idreview, review_user_iduser, order_idorder, order_payment_method_idpayment_method, order_order_status_idorder_status } = body;

    if (!plate || !model || typeof price_per_day !== 'number' || price_per_day <= 0) {
      return new Response(JSON.stringify({ error: 'Debes proporcionar la placa, modelo y precio por día válido para el auto' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const auto = await prisma.vehicle.create({
      data: {
        plate,
        model,
        detail,
        year,
        price_per_day,
        long_description,
        short_description,
        brand_idbrand,
        category_idcategory,
        review_idreview,
        review_user_iduser,
        order_idorder,
        order_payment_method_idpayment_method,
        order_order_status_idorder_status,
      },
    });

    return new Response(JSON.stringify({ mensaje: 'Auto registrado exitosamente' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ Error: 'Error al registrar el auto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// Método GETALL
export async function GETALL(request) {
  try {
    const autos = await prisma.vehicle.findMany();
    return new Response(JSON.stringify(autos), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ mensaje: 'Error al obtener los autos' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// Método GET
export async function GET(request) {
  try {
    const { id } = request.params;

    if (!id) {
      return new Response(JSON.stringify({ mensaje: 'Debes proporcionar el ID del auto a obtener' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const auto = await prisma.vehicle.findUnique({
      where: {
        idvehicle: parseInt(id),
      },
    });

    if (!auto) {
      return new Response(JSON.stringify({ mensaje: 'Auto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(auto), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ mensaje: 'Error al obtener el auto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// Método PUT
export async function PUT(request) {
  try {
    const { id } = request.params;
    const body = await request.json();
    const { plate, model, detail, year, price_per_day, long_description, short_description, brand_idbrand, category_idcategory, review_idreview, review_user_iduser, order_idorder, order_payment_method_idpayment_method, order_order_status_idorder_status } = body;

    if (!id) {
      return new Response(JSON.stringify({ mensaje: 'Debes proporcionar el ID del auto a editar' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (!plate || !model || typeof price_per_day !== 'number' || price_per_day <= 0) {
      return new Response(JSON.stringify({ error: 'Debes proporcionar la placa, modelo y precio por día válido para el auto' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const updatedAuto = await prisma.vehicle.update({
      where: {
        idvehicle: parseInt(id),
      },
      data: {
        plate,
        model,
        detail,
        year,
        price_per_day,
        long_description,
        short_description,
        brand_idbrand,
        category_idcategory,
        review_idreview,
        review_user_iduser,
        order_idorder,
        order_payment_method_idpayment_method,
        order_order_status_idorder_status,
      },
    });

    if (!updatedAuto) {
      return new Response(JSON.stringify({ Error: 'Auto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ mensaje: 'Auto editado exitosamente' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ Error: 'Error al editar el auto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// Método DELETE
export async function DELETE(request) {
  try {
    const { id } = request.params;

    if (!id) {
      return new Response(JSON.stringify({ mensaje: 'Debes proporcionar el ID del auto a eliminar' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const deletedAuto = await prisma.vehicle.delete({
      where: {
        idvehicle: parseInt(id),
      },
    });

    if (!deletedAuto) {
      return new Response(JSON.stringify({ mensaje: 'Auto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ mensaje: 'Auto eliminado exitosamente' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ Error: 'Error al eliminar el auto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
