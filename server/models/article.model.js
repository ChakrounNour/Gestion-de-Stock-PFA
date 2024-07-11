
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        nomA: { type: DataTypes.STRING, allowNull: false },
        descriptionA: { type: DataTypes.STRING, allowNull: false },
        image: {type: DataTypes.STRING},
        prixUnitaireInitial: { type: DataTypes.FLOAT, allowNull: false },
        prixUnitairePromo: { type: DataTypes.FLOAT },
        TVA: { type: DataTypes.FLOAT, allowNull: false },
        prixTTC: { type: DataTypes.FLOAT},
        promotion: { type: DataTypes.FLOAT, allowNull: false },




    };
    return sequelize.define('Article', attributes);
}

  
  