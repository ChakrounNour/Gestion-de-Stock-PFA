
const { DataTypes } = require('sequelize');
module.exports = model;

function model(sequelize) {
  
    const attributes ={
        dateExpiration: { type: DataTypes.DATEONLY, allowNull: false },
        qte: { type: DataTypes.INTEGER, allowNull: false },
    };
    return sequelize.define('CodeExpiration', attributes);
}

  
  