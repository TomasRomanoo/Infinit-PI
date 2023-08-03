const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'db.ctd.academy',
  port: 3306,
  user: '0723TDPRON1C06LAED0222PT_GRUPO3',
  password: 'ieC7eem5',
  database: '0723TDPRON1C06LAED0222PT_GRUPO3',
});


// Método POST 
export async function POST(request) {
  try {
    const body = await request.json();
    const { marca, modelo, precio } = body;

    if (!marca || !modelo || !precio) {
      return new Response(JSON.stringify({ error: 'Debes proporcionar marca, modelo y precio para el auto' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const connection = await pool.getConnection();
    try {
      await connection.query('INSERT INTO autos (marca, modelo, precio) VALUES (?, ?, ?)', [marca, modelo, precio]);
      return new Response(JSON.stringify({ mensaje: 'Auto registrado exitosamente' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ Error: 'Error al registrar el auto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}


// Método GET 
export async function GETALL(request) {
  try {
    const connection = await pool.getConnection();
    try {
      const [autos] = await connection.query('SELECT * FROM autos');
      return new Response(JSON.stringify(autos), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ mensaje: 'Error al obtener los autos' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function GET(request) {
  try {
    const connection = await pool.getConnection();
    try {
      const { id } = request.params;

      if (!id) {
        return new Response(JSON.stringify({ mensaje: 'Debes proporcionar el ID del auto a obtener' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const [autos] = await connection.query('SELECT * FROM autos WHERE id = ?', [id]);

      if (autos.length === 0) {
        return new Response(JSON.stringify({ mensaje: 'Auto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify(autos[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } finally {
      connection.release();
    }
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

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query('UPDATE autos SET marca = ?, modelo = ?, precio = ? WHERE id = ?', [marca, modelo, precio, id]);

      if (result.affectedRows === 0) {
        return new Response(JSON.stringify({ Error: 'Auto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ mensaje: 'Auto editado exitosamente' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } finally {
      connection.release();
    }
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

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query('DELETE FROM autos WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return new Response(JSON.stringify({ mensaje: 'Auto no encontrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ mensaje: 'Auto eliminado exitosamente' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ Error: 'Error al eliminar el auto' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
