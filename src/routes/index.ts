import { Router } from "express";
import campaniaRoutes from "./campania.routes";
import usuarioRoutes from "./usuario.routes";
import companiesRoutes from "./companies.routes";

const router = Router();

router.use("/campanias", campaniaRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/companies", companiesRoutes);

export default router;
