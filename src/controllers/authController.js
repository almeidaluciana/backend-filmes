// Realiza a autenticação de usuários
const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs"); // é a biblioteca de hashing de senhas em JavaScript
const jwt = require("jsonwebtoken"); // é a biblioteca que cria e valida JWTs

const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
  async registrarUsuario(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ erro: "E-mail e senha são obrigatórios." });
      }

      const novoUsuario = await userModel.create({ email, senha }); // cria o usuário

      res.status(201).json({
        message: "Usuário criado com sucesso!",
        id: novoUsuario.id,
      });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ erro: "E-mail e senha são obrigatórios." });
      }

      const usuario = await userModel.findOne({ where: { email } }); // procura usuário por email

      // verifica se a senha digitada é igual a senha o usuário cadastrado
      if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(401).json({ erro: "E-mail ou senha inválidos." });
      }

      // gera o token
      const token = jwt.sign({ id: usuario.id }, SECRET_KEY, {
        expiresIn: "1h", // ele tem duranção de 1 hora
      });

      res.json({ message: "Login bem sucedido!", token }); // retorna o token para o usuário
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = AuthController;
