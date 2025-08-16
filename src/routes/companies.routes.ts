import express, { Request, Response } from "express";
import { 
  createCompanyController,
} from "../controllers/companies.controller";

const router = express.Router();

router.post("/companies", (req: Request, res: Response) => createCompanyController(req, res));

export default router;