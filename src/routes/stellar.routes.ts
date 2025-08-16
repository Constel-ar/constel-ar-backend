import { Router } from "express";
import { StellarController } from "../controllers/stellar.controller";

const router = Router();
router.get("/balance", StellarController.getBalance);

export default router;
