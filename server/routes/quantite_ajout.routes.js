
module.exports = app => {
    const qte_ajout = require("../controllers/quantite_ajout.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //magasin
    router.post("/:fournisseur_id/:article_Id",authorize(), qte_ajout.create);
    router.get("/",authorize(),
    qte_ajout.findAll);

    router.put("/:id",authorize(),
    qte_ajout.update
    );

    router.delete("/:id",authorize(),
    qte_ajout.delete
    );

    router.get("/:article_Id/:fournisseur_id",authorize(),
    qte_ajout.find
    );
    router.get("/:id",authorize(),
    qte_ajout.findOne
    );

    
    app.use("/api/qte_ajout",router);
}