
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
          },
        etat: { type: DataTypes.STRING, allowNull: true },
        qte: { type: DataTypes.INTEGER, allowNull: true },


    };
    return sequelize.define('inventaire_article', attributes);
}

  
  