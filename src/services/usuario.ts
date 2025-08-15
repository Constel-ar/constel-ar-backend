import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase: SupabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export interface Usuario {
  id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
  fecha_creacion: string;
  rol: string;
}

// Crear usuario
export async function crearUsuario(usuario: Usuario): Promise<Usuario> {
  const { data, error } = await supabase
    .from("usuarios")
    .insert([{
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      contraseña: usuario.contraseña,
      rol: usuario.rol || "user",  
      fecha_creacion: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Usuario;
}


// Obtener todos los usuarios
export async function obtenerUsuarios(): Promise<Usuario[]> {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .order("fecha_creacion", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Usuario[];
}

// Obtener usuario por ID
export async function obtenerUsuarioPorId(id: string): Promise<Usuario | null> {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Usuario | null;
}
