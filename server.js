require("dotenv").config(); // carrega as variáveis de ambiente
const app = require("./src/app.js");

const PORT = process.env.PORT || 3000; // define a porta do servidor

app.listen(PORT, "0.0.0.0", () => {
  //0.0.0.0 permite que seja acessado de qualquer IP (deploy)
  console.log(`Servidor executando na porta ${PORT}`);
});
