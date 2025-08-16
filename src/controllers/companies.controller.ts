import { Request, Response } from "express";
import { createCompanyService } from "../services/companies.service";

export const createCompanyController = async (req: Request, res: Response) => {
  try {
    const { nombre, cuit, presupuesto, otros_datos } = req.body;

    if (!nombre || !cuit) {
      return res.status(400).json({ error: "Nombre y CUIT son obligatorios" });
    }

    const empresa = await createCompanyService({
      nombre,
      cuit,
      presupuesto,
      otros_datos,
    });

    res.status(201).json({ mensaje: "Empresa creada", empresa });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
