require("dotenv").config();

const express = require("express"); //Framework
const pool = require("./db"); //Acceso BD

//Framework
const app = express();

//Configuración comunicación JSON
app.use(express.json());

//Configuración del puerto:
const port = process.env.PORT || 3000;

//Gestiona los errores:
const handDbError = (res, error) => {
  console.error("Error en la base de datos: ", error);
  res.status(500).json({ error: "Error interno en el servicio" });
};

//GET - Consulta todos los datos
app.get("/mascotas", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM mascotas ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    handDbError(res, error);
  }
});

// GET - Consulta un dato por id
app.get("/mascotas/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM mascotas WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    res.json(results[0]); // Devuelve solo la primera coincidencia
  });
});


// POST
app.get("/mascotas", async (req, res) => {
  const { nombre, tipo, raza, color, peso, genero } = req.body;

  if (!nombre || !tipo || !raza || !color || !peso || !genero) {
    return res
      .status(400)
      .json({ error: "¡Todos los campos son obligatorios!" });
  }

  //Insertar nuevo registro (mascota)
  try {
    const result = await pool.query(
      "INSERT INTO mascotas (nombre, tipo, raza, color, peso, genero) VALUES (?,?,?,?,?,?)",
      [nombre, tipo, raza, color, peso, genero]
    );
    const nuevoRegistro = { id: result.insertId };
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    //Error (duplicado)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "La mascota ya existe" });
    }
  }
});

// PUT
app.get("/mascotas", async (req, res) => {
  const { id } = req.params;

  //Campos viene en JSON
  const { nombre, tipo, raza, color, peso, genero } = req.body;

  if (!id || !nombre || !tipo || !raza || !color || !peso || !genero) {
    return res
      .status(400)
      .json({ error: "¡¡Todos los campos son obligatorios!" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE mascotas SET nombre = ?, tipo = ?, raza = ?, color = ?, peso = ?, genero = ? WHERE id = ?",
      [nombre, tipo, raza, color, peso, genero, id]
    );

    //No hubo cambios en la base de datos...
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "¡Mascota no fue encontrada!" });
    }

    //Se logró realizar un cambio
    return res
      .status(200)
      .json({ mensaje: "¡Mascota actualizada correctamente!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "La mascota ya existe" });
    }
    handDbError(res, error);
  }
});

// DELETE
app.delete("/mascotas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM mascotas WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "¡Mascota no encontrada!" });
    }
    return res.status(200).json({ message: "Mascota eliminada correctamente" });
  } catch (error) {
    handDbError(res, error);
  }
});

//Para ejecutarlo
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
