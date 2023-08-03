const express = require('express');
const mysql = require('mysql2/promise');

const app = express();


const pool = mysql.createPool({
  host: 'db.ctd.academy',
  port: 3306,
  user: '0723TDPRON1C06LAED0222PT_GRUPO3',
  password: 'ieC7eem5',
  database: '0723TDPRON1C06LAED0222PT_GRUPO3',
});

app.use(express.json());

// POST 
app.post('/autos', async (req, res) => {
  try {
    const { marca, modelo, precio } = req.body;

    if (!marca || !modelo || !precio) {
      return res.status(400).json({ error: 'Debes proporcionar marca, modelo y precio para el auto' });
    }

    const connection = await pool.getConnection();
    try {
      await connection.query('INSERT INTO autos (marca, modelo, precio) VALUES (?, ?, ?)', [marca, modelo, precio]);
      return res.status(200).json({ mensaje: 'Auto registrado exitosamente' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: 'Error al registrar el auto' });
  }
});

// GET 
app.get('/autos', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [autos] = await connection.query('SELECT * FROM autos');
      return res.status(200).json(autos);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener los autos' });
  }
});

// GET 
app.get('/autos/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ mensaje: 'Debes proporcionar el ID del auto a obtener' });
      }

      const [autos] = await connection.query('SELECT * FROM autos WHERE id = ?', [id]);

      if (autos.length === 0) {
        return res.status(404).json({ mensaje: 'Auto no encontrado' });
      }

      return res.status(200).json(autos[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener el auto' });
  }
});

// PUT
app.put('/autos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, precio } = req.body;

    if (!id) {
      return res.status(400).json({ mensaje: 'Debes proporcionar el ID del auto a editar' });
    }

    if (!marca || !modelo || !precio) {
      return res.status(400).json({ error: 'Debes proporcionar marca, modelo y precio para el auto' });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query('UPDATE autos SET marca = ?, modelo = ?, precio = ? WHERE id = ?', [marca, modelo, precio, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ Error: 'Auto no encontrado' });
      }

      return res.status(200).json({ mensaje: 'Auto editado exitosamente' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: 'Error al editar el auto' });
  }
});

// DELETE 
app.delete('/autos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: 'Debes proporcionar el ID del auto a eliminar' });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query('DELETE FROM autos WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Auto no encontrado' });
      }

      return res.status(200).json({ mensaje: 'Auto eliminado exitosamente' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: 'Error al eliminar el auto' });
  }
});


app.listen(port, () => {
  console.log(`servidor escuchando puerto ${3000}`);
});
