const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const errorHandler = require("./utils/errorHandler");
const agentesRoutes = require("./routes/agentesRoutes");
const casosRoutes = require("./routes/casosRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger");
const db = require("./db/db");

swaggerDocument(app);
app.use("/casos", casosRoutes);
app.use("/agentes", agentesRoutes);
app.use("/api-db", db);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: "Rota não encontrada" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`
  );
});
