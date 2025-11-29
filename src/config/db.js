// Configura a conexão com o banco MySQL usando o Sequelize
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
    pool: {
      // são as conexões abertas com o banco de dados
      max: 5, // pode ter no máximo 5 conexões abertas com o banco
      min: 0, // pode ter 0 conexões quando não estão em uso
      idle: 30000, // Conexões ociosas >30s são fechadas
      acquire: 10000, // espera até 10s por conexão antes de dar erro
    },
  }
);

// testa a conexão com o banco
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectando ao MySQL com Sequelize!");
  } catch (error) {
    console.error("Erro ao conectar ao BD:", error);
  }
})();

// exporta o objeto sequelize para ser usado nos models
module.exports = sequelize;
