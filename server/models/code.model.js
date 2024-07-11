
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
          
        qte: { type: DataTypes.INTEGER, allowNull: false },
        dateExpiration: { type: DataTypes.DATEONLY, allowNull: false }, 


    };
    return sequelize.define('Code', attributes);
}

  
