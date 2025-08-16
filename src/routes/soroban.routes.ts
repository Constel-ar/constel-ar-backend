import { Router } from "express";
import { SorobanController } from "../controllers/soroban.controller";

const router = Router();
router.get("/events", SorobanController.getEvents);

export default router;
