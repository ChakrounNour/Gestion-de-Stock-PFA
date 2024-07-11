
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        nomS: { type: DataTypes.STRING, allowNull: false },
        adresseLocal: { type: DataTypes.STRING, allowNull: false },
        label: { type: DataTypes.STRING, allowNull: false },



    };
    return sequelize.define('Stock', attributes);
}

  
  