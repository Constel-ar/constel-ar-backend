import express, { Application } from "express";
import campaniaRoutes from "./routes/campania";

const app: Application = express();
const PORT: number = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/campanias", campaniaRoutes);


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
