import express from "express";
import { 
  crearCampanaEnEsperaController,
  confirmarCampanaController,
  listarCampanasEnEsperaController,
  listarCampanasConfirmadasController,
  eliminarCampanaEnEsperaController
} from "../controllers/campania.js";

const router = express.Router();

// Campañas en espera
router.post("/espera", crearCampanaEnEsperaController);
router.get("/espera", listarCampanasEnEsperaController);

// Confirmar campaña
router.post("/espera/:id/confirmar", confirmarCampanaController);

// Campañas confirmadas
router.get("/confirmadas", listarCampanasConfirmadasController);

router.delete("/espera/:id", eliminarCampanaEnEsperaController);

export default router;
