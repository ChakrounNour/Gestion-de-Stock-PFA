
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        cinCli: { type: DataTypes.STRING, allowNull: false },
        nomCli: { type: DataTypes.STRING, allowNull: false },
        prenomCli: { type: DataTypes.STRING, allowNull: false },
        telCli: { type: DataTypes.STRING, allowNull: false },
        adresseCli: { type: DataTypes.STRING, allowNull: false },

    };
    return sequelize.define('Client', attributes);
}

  
  