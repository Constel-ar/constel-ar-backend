import { 
  crearCampanaEnEspera,
  confirmarCampana,
  obtenerCampanasEnEspera,
  obtenerCampanasConfirmadas,
  eliminarCampanaEnEspera
} from "../services/campania.js";


// Crear campaña en espera
export async function crearCampanaEnEsperaController(req, res) {
  try {
    const nueva = await crearCampanaEnEspera(req.body);
    res.status(201).json({ mensaje: "Campaña en espera creada", nueva });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Confirmar campaña
export async function confirmarCampanaController(req, res) {
  try {
    const confirmada = await confirmarCampana(parseInt(req.params.id));
    res.status(201).json({ mensaje: "Campaña confirmada", confirmada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Listar campañas en espera
export async function listarCampanasEnEsperaController(req, res) {
  try {
    const campanas = await obtenerCampanasEnEspera();
    res.json(campanas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Listar campañas confirmadas
export async function listarCampanasConfirmadasController(req, res) {
  try {
    const campanas = await obtenerCampanasConfirmadas();
    res.json(campanas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para eliminar campaña en espera
export async function eliminarCampanaEnEsperaController(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const eliminada = await eliminarCampanaEnEspera(id);

    if (!eliminada || eliminada.length === 0) {
      return res.status(404).json({ error: "Campaña en espera no encontrada" });
    }

    res.json({ mensaje: "Campaña en espera eliminada", eliminada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

