const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const bcrypt = require("bcryptjs");

const userModel = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    /*
     * Hooks são funções que o Sequelize chama automaticamente em determinados momentos do ciclo de vida de um model.
     * Alguns exemplos:
     * - beforeCreate = antes de criar um registro.
     * - afterCreate = depois de criar um registro.
     * - beforeUpdate = antes de atualizar um registro.
     * - beforeDestroy = antes de deletar.
     */
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); // gera um valor aleatório chamado salt que será usado para criar o hash da senha, o 10 é a quantidade de rounds, que aumenta a complexidade e segurança do hash
        user.senha = await bcrypt.hash(user.senha, salt); // pega a senha em texto puro e transforma em um hash criptografado
      },
    },
  }
);

module.exports = userModel;
