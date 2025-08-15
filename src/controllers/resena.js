import { crearResena, obtenerResenasPorCampania } from "../services/resena.js";

// Crear una reseña
export async function crearResenaController(req, res) {
  try {
    const { idCampania, usuario, comentario, rating } = req.body;

    if (!idCampania || !usuario || !comentario || !rating) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const nuevaResena = await crearResena({ idCampania, usuario, comentario, rating });
    res.status(201).json({ mensaje: "Reseña creada con éxito", nuevaResena });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener reseñas por campaña
export async function obtenerResenasController(req, res) {
  try {
    const idCampania = parseInt(req.params.id, 10);
    const resenas = await obtenerResenasPorCampania(idCampania);
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
