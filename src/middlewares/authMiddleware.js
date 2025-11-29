// Middleware para proteger rotas
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se a pessoa enviou o token
  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  /*
   * Normalmente o token é enviado assim pelo frontend:
   * Authorization: Bearer <token>
   * Então precisamos separar o token
   */
  const [scheme, token] = authHeader.split(" ");

  // Se não estiver no formato correto, retorna 401
  if (scheme !== "Bearer") {
    return res.status(401).json({ erro: "Token mal formatado." });
  }

  // verifica se o token é válido e assinado com a SECRET_KEY
  jwt.verify(token, SECRET_KEY, (erro, decoded) => {
    // essa função é chamada após a verificação
    // verifica se o token é inválido ou expirado
    if (erro) {
      return res.status(401).json({ erro: "Token inválido ou expirado." });
    }

    /*
     * Pega o id do usuário que estava dentro do token
     * Armazena em req.userId, que pode ser usado nas rotas seguintes
     */
    req.userId = decoded.id;
    next(); // passa para a rota dos filmes
  });
};

module.exports = authMiddleware;
