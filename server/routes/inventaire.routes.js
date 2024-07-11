
module.exports = app => {
    const Inventaire = require("../controllers/inventaire.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //magasin
    router.post("/",authorize(), Inventaire.create);

    router.get("/",authorize(),
    Inventaire.findAll);

    router.put("/:id",authorize(),
    Inventaire.update
    );

    router.delete("/:id",authorize(),
    Inventaire.delete
    );

    router.get("/GetRapport",authorize(),
    Inventaire.GetRapport
    );

    router.get("/:id",authorize(),
    Inventaire.findOne
    );


    
    app.use("/api/inventaire",router);
}