
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },


    };
    return sequelize.define('stock_user', attributes);
}

  
  