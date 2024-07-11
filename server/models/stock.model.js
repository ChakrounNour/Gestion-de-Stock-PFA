
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        etat: { type: DataTypes.STRING, allowNull: false },
        qte: { type: DataTypes.INTEGER, allowNull: false },

    };
    return sequelize.define('Stock', attributes);
}

  
  