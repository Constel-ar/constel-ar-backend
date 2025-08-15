import express from "express";
import campaniaRoutes from "./routes/campania.js";
import resenaRoutes from "./routes/resena.js";
import generadorRoutes from "./routes/generador.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/campanias", campaniaRoutes);
app.use("/resenas", resenaRoutes);
app.use("/generar-codigo", generadorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
