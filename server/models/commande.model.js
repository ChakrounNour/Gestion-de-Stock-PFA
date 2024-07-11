
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        dateC: { type: DataTypes.DATEONLY, allowNull: false },
        montant: { type: DataTypes.FLOAT, allowNull: false },

        

    };
    return sequelize.define('Commande', attributes);
}

  
  