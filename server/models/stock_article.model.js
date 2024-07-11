
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
        qteArticle: { type: DataTypes.INTEGER, allowNull: true },


    };
    return sequelize.define('stock_article', attributes);
}

  
  