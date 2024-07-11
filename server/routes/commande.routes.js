
module.exports = app => {
    const Commande = require("../controllers/commande.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //magasin
    router.post("/:client_Id/:value/:article_id",authorize(), Commande.create);

    router.get("/:client_Id",authorize(),
    Commande.findAll2);
    router.get("/",authorize(),
    Commande.findAll);
    router.get("/:client_Id",authorize(),Commande.find)

    router.put("/:id",authorize(),
    Commande.update
    );

    router.delete("/:id",authorize(),
    Commande.delete
    );

    router.get("/:id",authorize(),
    Commande.findOne
    );

    
    app.use("/api/Commande",router);
}