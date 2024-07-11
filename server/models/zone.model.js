
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        nomZ: { type: DataTypes.STRING, allowNull: false },

    };
    return sequelize.define('zone', attributes);
}

  
  