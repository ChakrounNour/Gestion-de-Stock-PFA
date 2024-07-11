
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        nomM: { type: DataTypes.STRING, allowNull: false },

    };
    return sequelize.define('Marque', attributes);
}

  
  