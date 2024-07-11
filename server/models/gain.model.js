
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        montant: { type: DataTypes.DOUBLE, allowNull: false },

    };
    return sequelize.define('Gain', attributes);
}

  
  