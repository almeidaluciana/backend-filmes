const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const filmeModel = sequelize.define(
  "Filmes",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diretor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false } // Sem timestamps (createdAt, updatedAt).
);

module.exports = filmeModel;
