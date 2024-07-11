
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        nomF: { type: DataTypes.STRING, allowNull: false },
        adresseF: { type: DataTypes.STRING, allowNull: false },
        matriculeFiscale: { type: DataTypes.STRING, allowNull: false },
        emailF: { type: DataTypes.STRING, allowNull: false },
        telF: { type: DataTypes.STRING, allowNull: false },


    };
    return sequelize.define('Fournisseur', attributes);
}

  
  