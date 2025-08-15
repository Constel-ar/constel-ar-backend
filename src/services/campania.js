import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { generarCodigo } from "./generador.js"; 

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


// Crear campaña temporal (en espera)
export async function crearCampanaEnEspera({ nombre, categoria }) {
  const { data, error } = await supabase
    .from("campanas_espera") // tabla temporal
    .insert([{
      nombre,
      categoria,
      imagen_url: imagenURL || null
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function confirmarCampana(id) {
  // Traer campaña en espera
  const { data: campanaEnEspera, error: fetchError } = await supabase
    .from("campanas_espera")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !campanaEnEspera) {
    throw new Error("Campaña en espera no encontrada");
  }

  // Generar código único
  const codigo = generarCodigo();

  // Insertar en tabla confirmadas
  const { data: campanaConfirmada, error: insertError } = await supabase
    .from("campanas_confirmadas")
    .insert([{
      nombre: campanaEnEspera.nombre,
      codigo,
      estado: "activa",
      categoria: campanaEnEspera.categoria,
      reseñas: [], // inicialmente vacía
      idBusy: "activa",
      imagen_url: imagenURL || null
    }])
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  // Eliminar de la tabla temporal
  await supabase.from("campanas_en_espera").delete().eq("id", id);

  return campanaConfirmada;
}

// Obtener campañas en espera
export async function obtenerCampanasEnEspera() {
  const { data, error } = await supabase
    .from("campanas_en_espera")
    .select("*")
    .order("fecha_creacion", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// Obtener campañas confirmadas
export async function obtenerCampanasConfirmadas() {
  const { data, error } = await supabase
    .from("campanas_confirmadas")
    .select("*")
    .order("fecha_creacion", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// Eliminar campaña en espera por ID
export async function eliminarCampanaEnEspera(id) {
  const { data, error } = await supabase
    .from("campanas_en_espera")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

