import express from "express";
import { generarCodigoController } from "../controllers/generador.js";

const router = express.Router();

router.get("/", generarCodigoController);

export default router;
