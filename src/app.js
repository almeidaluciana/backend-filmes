const express = require("express");
const bodyParser = require("body-parser"); // interpreta JSON do frontend
const filmeRoutes = require("./routes/filmeRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const userModel = require("./models/userModel.js");
const filmeModel = require("./models/filmeModel.js");
const cors = require("cors");

const app = express();

/**
 * CORS (Cross-Origin Resource Sharing) é um mecanismo de segurança do navegador.
 * Ele controla quais domínios podem fazer requisições para o seu servidor.
 * Por padrão, um navegador bloqueia requisições de outro domínio que não seja o mesmo do backend
 */
app.use(
  cors({
    origin: "*", // permite qualquer domínio acessar sua API
    methods: "GET,POST,PUT,DELETE", // define quais métodos HTTP o frontend pode usar
    allowedHeaders: "Content-Type,Authorization", // define quais cabeçalhos HTTP podem ser enviados pelo frontend
  })
); // Permite requisições do frontend
app.use(bodyParser.json());
//Registra rotas /auth e /filmes
app.use("/auth", authRoutes);
app.use("/filmes", filmeRoutes);

// cria tabela Users no banco se não existir.
userModel.sync();
filmeModel.sync();

module.exports = app;
