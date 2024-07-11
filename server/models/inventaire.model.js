
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
        annee: { type: DataTypes.INTEGER, allowNull: false },

    };
    return sequelize.define('Inventaire', attributes);
}

  
  