
module.exports = app => {
    const qte_commander= require("../controllers/quantite_commander.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    router.post("/:article_Id/:commande_Id",authorize(), qte_commander.create);

    router.get("/",authorize(),
    qte_commander.findAll);

    router.get("/rapport/",authorize(),
    qte_commander.GetRapportVente_Mois)

    router.delete("/:id",authorize(),
    qte_commander.delete
    );

    router.get("/:commande_Id",authorize(),
    qte_commander.find
    );
    router.put("/:id",authorize(),
    qte_commander.update
    );

    router.get("/:id",authorize(),
    qte_commander.findOne1
    );

   
    
    app.use("/api/qte_commander",router);
}