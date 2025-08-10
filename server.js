const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const errorHandler = require("./utils/errorHandler");
const agentesRoutes = require("./routes/agentesRoutes");
const casosRoutes = require("./routes/casosRoutes");

app.use("/casos", casosRoutes);
app.use("/agentes", agentesRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: "Rota não encontrada" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`
  );
});
