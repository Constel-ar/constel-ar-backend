import { supabase } from "../supabase/client";

interface CreateCompanyDTO {
  nombre: string;
  cuit: string;
  presupuesto?: number;
  otros_datos?: any;
}

export const createCompanyService = async (empresa: CreateCompanyDTO) => {
  const { data, error } = await supabase
    .from("empresas")
    .insert([empresa])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};
