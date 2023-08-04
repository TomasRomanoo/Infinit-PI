const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Método POST
export async function POST(request) {
  try {
    const body = await request.json();
    const { marca, modelo, precio } = body;

    if (!marca || !modelo || !precio) {
      return new Response(JSON.stringify({ error: 'Debes proporcionar marca, modelo y precio para el auto' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const auto = await prisma.auto.create({
      data: {
        marca,
        modelo,
        precio,
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
    const autos = await prisma.auto.findMany();
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

    const auto = await prisma.auto.findUnique({
      where: {
        id: parseInt(id),
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
    const { marca, modelo, precio } = body;

    if (!id) {
      return new Response(JSON.stringify({ mensaje: 'Debes proporcionar el ID del auto a editar' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (!marca || !modelo || !precio) {
      return new Response(JSON.stringify({ error: 'Debes proporcionar marca, modelo y precio para el auto' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const updatedAuto = await prisma.auto.update({
      where: {
        id: parseInt(id),
      },
      data: {
        marca,
        modelo,
        precio,
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

    const deletedAuto = await prisma.auto.delete({
      where: {
        id: parseInt(id),
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
