
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        nomSC: { type: DataTypes.STRING, allowNull: false },

    };
    return sequelize.define('SousCategorie', attributes);
}

  
  