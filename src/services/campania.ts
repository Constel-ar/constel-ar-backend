import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase: SupabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Tipos de datos
interface CampanaEnEspera {
  id?: number;
  nombre: string;
  categoria: string;
  presupuesto: number;
  descripcion: string;
  imagen_url?: string | null;
  fecha_creacion: string;
  creador: string; 
}

interface CampanaConfirmada {
  id?: number;
  nombre: string;
  estado: boolean;
  categoria: string;
  presupuesto: number;
  descripcion: string;
  idBusy: string;
  imagen_url?: string | null;
  total_recaudado: number;
  fecha_creacion: string;
  fecha_limite?: string;
  creador: string; 
}

// Crear campaña temporal (en espera)
export async function crearCampanaEnEspera({
  nombre,
  categoria,
  presupuesto,
  descripcion,
  imagenURL,
  creador
}: {
  nombre: string;
  categoria: string;
  presupuesto: number;
  descripcion: string;
  imagenURL?: string;
  creador: string;
}): Promise<CampanaEnEspera> {
  const { data, error } = await supabase
    .from("campanias_temporales")
    .insert([
      {
        nombre,
        categoria,
        presupuesto,
        descripcion,
        creador,
        imagen_url: imagenURL || null,
        fecha_creacion: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as CampanaEnEspera;
}

// Confirmar campaña
export async function confirmarCampana(id: number): Promise<CampanaConfirmada> {
  // Traer campaña en espera
  const { data: campanaEnEspera, error: fetchError } = await supabase
    .from("campanias_temporales")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !campanaEnEspera) {
    throw new Error("Campaña en espera no encontrada");
  }

  // Insertar en tabla confirmadas con estado boolean = true
  const { data: campanaConfirmada, error: insertError } = await supabase
    .from("campanias_confirmadas")
    .insert([
      {
        nombre: campanaEnEspera.nombre,
        estado: true, // ahora es boolean
        categoria: campanaEnEspera.categoria,
        presupuesto: campanaEnEspera.presupuesto,
        descripcion: campanaEnEspera.descripcion,
        idBusy: "activa",
        imagen_url: campanaEnEspera.imagen_url || null,
        total_recaudado: campanaEnEspera.total_recaudado || 0,
        fecha_creacion: campanaEnEspera.fecha_creacion || new Date().toISOString(),
        fecha_limite: null, // por si quieres asignarlo después
        creador: campanaEnEspera.creador
      },
    ])
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  // Eliminar de la tabla temporal
  await supabase.from("campanias_temporales").delete().eq("id", id);

  return campanaConfirmada as CampanaConfirmada;
}

// Obtener campañas en espera
export async function obtenerCampanasEnEspera(): Promise<CampanaEnEspera[]> {
  const { data, error } = await supabase
    .from("campanias_temporales")
    .select("*")
    .order("fecha_creacion", { ascending: false });

  if (error) throw new Error(error.message);
  return data as CampanaEnEspera[];
}

// Obtener campañas confirmadas
export async function obtenerCampanasConfirmadas(): Promise<CampanaConfirmada[]> {
  const { data, error } = await supabase
    .from("campanias_confirmadas")
    .select("*")
    .order("fecha_creacion", { ascending: false });

  if (error) throw new Error(error.message);
  return data as CampanaConfirmada[];
}

// Eliminar campaña en espera por ID
export async function eliminarCampanaEnEspera(
  id: number
): Promise<CampanaEnEspera[]> {
  const { data, error } = await supabase
    .from("campanias_temporales")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data as CampanaEnEspera[];
}
