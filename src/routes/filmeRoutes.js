const express = require("express");
const FilmeController = require("../controllers/filmeController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();
const filme = new FilmeController();

router.use(authMiddleware);

router.get("/", (req, res) => filme.BuscarTodosOsFilmes(req, res));
router.get("/:id", (req, res) => filme.BuscarFilmePorId(req, res));
router.post("/", (req, res) => filme.CadastrarFilme(req, res));
router.put("/:id", (req, res) => filme.AtualizarFilme(req, res));
router.delete("/:id", (req, res) => filme.ExcluirFilme(req, res));

module.exports = router;
