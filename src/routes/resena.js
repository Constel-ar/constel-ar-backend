import express from "express";
import { crearResenaController, obtenerResenasController } from "../controllers/resena.js";

const router = express.Router();

router.post("/", crearResenaController);
router.get("/:id", obtenerResenasController);

export default router;
