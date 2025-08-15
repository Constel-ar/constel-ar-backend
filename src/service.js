import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * Obtiene todas las reseñas de una campaña por su ID
 * @param {number} idCampania - ID de la campaña
 * @returns {Promise<Array>} - Lista de reseñas
 */

/**
 * Crea una nueva reseña para una campaña
 * @param {number} idCampania - ID de la campaña
 * @param {string} usuario - Nombre del usuario
 * @param {string} comentario - Texto de la reseña
 * @param {number} rating - Calificación (por ejemplo, 1 a 5)
 */
export async function crearResena({ idCampania, usuario, comentario, rating }) {
  const { data, error } = await supabase
    .from("resenas") // nombre de la tabla en Supabase (definir)
    .insert([{ id_campania: idCampania, usuario, comentario, rating }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function obtenerResenasPorCampania(idCampania) {
  const { data, error } = await supabase
    .from("resenas")              
    .select("*")                  // selecciona todas las columnas
    .eq("id_campania", idCampania) // filtra por campaña
    .order("created_at", { ascending: false }); // más recientes primero

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export function generarCodigo() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < 4; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indice];
  }
  return codigo;
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
// Crear campaña por confirmar
export async function crearCampaniaPorConfirmar({ nombre, descripcion, categoria, totalRequerido, moneda, fechaLimite, creador, imagenURL }) {
  const { data, error } = await supabase
    .from("campanias")
    .insert([{
      nombre,
      descripcion,
      categoria,
      total_requerido: totalRequerido,
      moneda,
      fecha_creacion: new Date(),
      fecha_limite: new Date(fechaLimite),
      creador,
      tipo: "por_confirmar",
      imagen_url: imagenURL || null
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Confirmar campaña
export async function confirmarCampania(id) {
  const { data: campaniaPorConfirmar, error: fetchError } = await supabase
    .from("campanias")
    .select("*")
    .eq("id", id)
    .eq("tipo", "por_confirmar")
    .single();

  if (fetchError || !campaniaPorConfirmar) {
    throw new Error("Campaña por confirmar no encontrada");
  }

  const { data: campaniaConfirmada, error: insertError } = await supabase
    .from("campanias")
    .insert([{
      nombre: campaniaPorConfirmar.nombre,
      descripcion: campaniaPorConfirmar.descripcion,
      categoria: campaniaPorConfirmar.categoria,
      total_requerido: campaniaPorConfirmar.total_requerido,
      total_recaudado: 0,
      moneda: campaniaPorConfirmar.moneda,
      fecha_creacion: new Date(),
      fecha_limite: campaniaPorConfirmar.fecha_limite,
      creador: campaniaPorConfirmar.creador,
      estado: "activa",
      tipo: "confirmada",
      imagen_url: campaniaPorConfirmar.imagen_url
    }])
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  await supabase.from("campanias").delete().eq("id", id);

  return campaniaConfirmada;
}

// Obtener campañas (opcional filtrar por tipo)
export async function obtenerCampanias(tipo = null) {
  let query = supabase.from("campanias").select("*");
  if (tipo) query = query.eq("tipo", tipo);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

// Obtener una campaña por ID
export async function obtenerCampaniaPorId(id) {
  const { data, error } = await supabase
    .from("campanias")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) throw new Error("Campaña no encontrada");
  return data;
}

// Editar campaña
export async function editarCampania(id, campos) {
  const { data, error } = await supabase
    .from("campanias")
    .update(campos)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}