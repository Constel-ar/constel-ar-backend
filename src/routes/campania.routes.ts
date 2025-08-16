import express, { Request, Response } from "express";
import { 
  crearCampanaEnEsperaController,
  confirmarCampanaController,
  listarCampanasEnEsperaController,
  listarCampanasConfirmadasController,
  eliminarCampanaEnEsperaController
} from "../controllers/campania";

const router = express.Router();

// Campañas en espera
router.post("/espera", (req: Request, res: Response) => crearCampanaEnEsperaController(req, res));
router.get("/espera", (req: Request, res: Response) => listarCampanasEnEsperaController(req, res));

// Confirmar campaña
router.post("/espera/:id/confirmar", (req: Request, res: Response) => confirmarCampanaController(req, res));

// Campañas confirmadas
router.get("/confirmadas", (req: Request, res: Response) => listarCampanasConfirmadasController(req, res));

// Eliminar campaña en espera
router.delete("/espera/:id", (req: Request, res: Response) => eliminarCampanaEnEsperaController(req, res));

export default router;
