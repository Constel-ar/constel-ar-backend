import express, { Request, Response } from "express";
import { 
  createCompany,
} from "../controllers/companies";

const router = express.Router();

router.post("/espera", (req: Request, res: Response) => createCompany(req, res));

export default router;