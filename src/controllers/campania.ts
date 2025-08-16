import { Request, Response } from "express";
import { 
  crearCampanaEnEspera,
  confirmarCampana,
  obtenerCampanasEnEspera,
  obtenerCampanasConfirmadas,
  eliminarCampanaEnEspera
} from "../services/campania";

// Crear campaña en espera
export async function crearCampanaEnEsperaController(req: Request, res: Response): Promise<void> {
  try {
    const nueva = await crearCampanaEnEspera(req.body);
    res.status(201).json({ mensaje: "Campaña en espera creada", nueva });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Confirmar campaña
export async function confirmarCampanaController(req: Request, res: Response): Promise<void> {
  try {
    const confirmada = await confirmarCampana(parseInt(req.params.id));
    res.status(201).json({ mensaje: "Campaña confirmada", confirmada });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Listar campañas en espera
export async function listarCampanasEnEsperaController(req: Request, res: Response): Promise<void> {
  try {
    const campanas = await obtenerCampanasEnEspera();a
    res.json(campanas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Listar campañas confirmadas
export async function listarCampanasConfirmadasController(req: Request, res: Response): Promise<void> {
  try {
    const campanas = await obtenerCampanasConfirmadas();
    res.json(campanas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para eliminar campaña en espera
export async function eliminarCampanaEnEsperaController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    const eliminada = await eliminarCampanaEnEspera(id);

    if (!eliminada || eliminada.length === 0) {
      res.status(404).json({ error: "Campaña en espera no encontrada" });
      return; // solo para salir de la función, sin retornar Response
    }

    res.json({ mensaje: "Campaña en espera eliminada", eliminada });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

