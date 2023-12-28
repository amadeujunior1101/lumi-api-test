import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { loadBillInit } from "./infra/containers";
import { billsRouter } from "./infra/routes";
import { sequelizeConfig } from "./infra/sequelize.config";

const app = express();
const port = process.env.PORT || 3333;

// Configurar opções do CORS
const corsOptions = {
  origin: "*",
  methods: "GET",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

// routes
app.use("/bills", billsRouter);

sequelizeConfig
  .sync()
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso");

    loadBillInit.execute();
    app.listen(port, () => {
      console.log(`Servidor está ouvindo na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar tabelas:", error);
  });
