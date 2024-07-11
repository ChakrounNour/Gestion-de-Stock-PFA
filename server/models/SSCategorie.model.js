
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        nomSSC: { type: DataTypes.STRING, allowNull: false },

    };
    return sequelize.define('SSCategorie', attributes);
}

  
  