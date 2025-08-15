import { generarCodigo, guardarCodigo } from "../services/generador.js";

export async function generarCodigoController(req, res) {
  try {
    const codigo = generarCodigo();
    await guardarCodigo(codigo);
    res.json({ mensaje: "Código generado y guardado con éxito", codigo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
