
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes ={
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
        date: { type: DataTypes.DATE, allowNull: true },
        qteC: { type: DataTypes.INTEGER, allowNull: true },
        modalitePaiement: { type: DataTypes.STRING, allowNull: true },
        montant: { type: DataTypes.FLOAT, allowNull: true },
        file: { type:DataTypes.STRING,allowNull:true},
        totalHT:{ type: DataTypes.FLOAT, allowNull: true },
        montantTTC:{ type: DataTypes.FLOAT, allowNull: true },
        montantHT:{ type: DataTypes.FLOAT, allowNull: true },
        timbre: { type: DataTypes.STRING, allowNull: false },
        totalTVA:{ type: DataTypes.FLOAT, allowNull: true },
        dateLiv: { type: DataTypes.DATEONLY, allowNull: true },
        modeLiv: { type: DataTypes.STRING, allowNull: true },

    };
    return sequelize.define('quantite_ajout', attributes);
}

  
