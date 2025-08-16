
import { Request, Response } from 'express';
import { supabase } from '../supabase/client'; 


// Esta función maneja la carga de una empresa (endpoint POST /companies)
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { nombre, cuit, presupuesto, otros_datos } = req.body;

    if (!nombre || !cuit) {
      return res.status(400).json({ error: 'Nombre y CUIT son obligatorios' });
    }
    const { data, error } = await supabase
      .from('empresas')
      .insert([{ nombre, cuit, presupuesto, otros_datos }])
      .select();

    if (error) {
      throw error;
    }
    res.status(201).json({ mensaje: 'Empresa creada', empresa: data[0] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
