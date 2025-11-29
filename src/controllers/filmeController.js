// faz um CRUD dos filmes

const filmeModel = require("../models/filmeModel.js");

class Filmes {
  async BuscarTodosOsFilmes(req, res) {
    try {
      const filmes = await filmeModel.findAll();
      res.json(filmes);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  async BuscarFilmePorId(req, res) {
    try {
      const filme = await filmeModel.findByPk(req.params.id);

      if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado!" });
      }

      res.json(filme);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  async CadastrarFilme(req, res) {
    try {
      const novoFilme = await filmeModel.create(req.body);
      res.status(201).json({
        message: "Filme cadastrado!",
        filme: novoFilme,
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  async AtualizarFilme(req, res) {
    try {
      /*
       * O método update do Sequelize atualiza o filme
       * Ele retorna um array contendo o número de registros atualizados
       */
      const [atualizado] = await filmeModel.update(req.body, {
        where: { id: req.params.id },
      });

      if (!atualizado) {
        return res.status(404).json({ erro: "Filme não encontrado!" });
      }

      const filmeAtualizado = await filmeModel.findByPk(req.params.id);
      res.json({
        message: "Filme atualizado com sucesso!",
        filme: filmeAtualizado,
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  async ExcluirFilme(req, res) {
    try {
      // O método destroy retorna o número de registros deletados
      const excluido = await filmeModel.destroy({
        where: { id: req.params.id },
      });

      if (!excluido) {
        return res.status(404).json({ erro: "Filme não encontrado!" });
      }

      res.json({ message: "Filme excluído com sucesso!" });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = Filmes;
