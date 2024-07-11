
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        nomC: { type: DataTypes.STRING, allowNull: false },

    };
    return sequelize.define('Categorie', attributes);
}

  
  