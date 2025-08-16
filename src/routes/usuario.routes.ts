import express from "express";
import {
  crearUsuarioController,
  listarUsuariosController,
  obtenerUsuarioController,
} from "../controllers/usuario";

const router = express.Router();

// Crear usuario
router.post("/", crearUsuarioController);

// Listar todos los usuarios
router.get("/", listarUsuariosController);

// Obtener usuario por ID
router.get("/:id", obtenerUsuarioController);

export default router;
