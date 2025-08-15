import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Crear una nueva reseña
export async function crearResena({ idCampania, usuario, comentario, rating }) {
  const { data, error } = await supabase
    .from("resenas")
    .insert([{ id_campania: idCampania, usuario, comentario, rating }]);

  if (error) throw new Error(error.message);
  return data;
}

// Obtener reseñas de una campaña
export async function obtenerResenasPorCampania(idCampania) {
  const { data, error } = await supabase
    .from("resenas")
    .select("*")
    .eq("id_campania", idCampania)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}




//////////////////// Función guardarCodigo para guardar el código en Supabase //////////////////

/* export async function guardarCodigo(codigo) {
  const { data, error } = await supabase
    .from("codigos")
    .insert([{ codigo }]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
} */