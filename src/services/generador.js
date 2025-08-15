import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Generar código alfanumérico de 4 caracteres en mayúscula
export function generarCodigo() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < 4; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indice];
  }
  return codigo;
}

// Guardar código en Supabase
export async function guardarCodigo(codigo) {
  const { data, error } = await supabase
    .from("codigos")
    .insert([{ codigo }]);

  if (error) throw new Error(error.message);
  return data;
}
