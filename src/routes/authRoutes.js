const express = require("express");
const AuthController = require("../controllers/authController.js");

const router = express.Router(); // é um objeto fornecido pelo Express que permite criar rotas separadas e modularizadas
const auth = new AuthController();

router.post("/register", (req, res) => auth.registrarUsuario(req, res));
router.post("/login", (req, res) => auth.login(req, res));

module.exports = router;
