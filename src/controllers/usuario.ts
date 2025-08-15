import { Request, Response } from "express";
import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, Usuario } from "../services/usuario";

// Crear usuario
export async function crearUsuarioController(req: Request, res: Response): Promise<void> {
  try {
    const nuevo: Usuario = await crearUsuario(req.body);
    res.status(201).json({ mensaje: "Usuario creado con éxito", nuevo });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Listar usuarios
export async function listarUsuariosController(req: Request, res: Response): Promise<void> {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener usuario por ID
export async function obtenerUsuarioController(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const usuario = await obtenerUsuarioPorId(id);

    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return; // solo para salir de la función, no devuelve nada
    }

    res.json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

