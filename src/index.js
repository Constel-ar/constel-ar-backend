import express from "express";
import { generarCodigo, guardarCodigo } from "./generador.js";
import { 
  crearCampaniaPorConfirmar, 
  confirmarCampania, 
  obtenerCampanias, 
  obtenerCampaniaPorId, 
  editarCampania, 
  eliminarCampania 
} from "./service/campanias.js";
import { crearResena } from "./resenas.js";

const app = express();
const PORT = 3000;

app.use(express.json());

//////////////////// Código de generación de códigos //////////////////
app.get("/generar-codigo", async (req, res) => {
  try {
    const codigo = generarCodigo();
    await guardarCodigo(codigo);
    res.json({ mensaje: "Código generado y guardado con éxito", codigo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////// Endpoints de campañas //////////////////

// Crear campaña por confirmar
app.post("/campanias", async (req, res) => {
  try {
    const nueva = await crearCampaniaPorConfirmar(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Confirmar campaña
app.post("/campanias/:id/confirmar", async (req, res) => {
  try {
    const confirmada = await confirmarCampania(parseInt(req.params.id));
    res.status(201).json(confirmada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las campañas
app.get("/campanias", async (req, res) => {
  try {
    const tipo = req.query.tipo || null;
    const campanias = await obtenerCampanias(tipo);
    res.json(campanias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener campaña por ID
app.get("/campanias/:id", async (req, res) => {
  try {
    const campania = await obtenerCampaniaPorId(parseInt(req.params.id));
    res.json(campania);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Editar campaña
app.put("/campanias/:id", async (req, res) => {
  try {
    const actualizada = await editarCampania(parseInt(req.params.id), req.body);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////// Endpoints de reseñas //////////////////
app.post("/resenas", async (req, res) => {
  try {
    const { idCampania, usuario, comentario, rating } = req.body;

    // Validaciones básicas
    if (!idCampania || !usuario || !comentario || !rating) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const nuevaResena = await crearResena({ idCampania, usuario, comentario, rating });
    res.status(201).json({ mensaje: "Reseña creada con éxito", nuevaResena });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/resenas/:id", async (req, res) => {
  try {
    const idCampania = parseInt(req.params.id, 10);
    const resenas = await obtenerResenasPorCampania(idCampania);
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
