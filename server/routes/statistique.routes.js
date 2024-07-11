    
module.exports = app => {
    const article = require("../controllers/article.controller.js");
    const statistique = require("../controllers/statistique.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    router.get("/:nomM",authorize(),statistique.graphiqueDynamique)
    router.get("/:zone/:date",authorize(),
    statistique.getStatMagasin);

    router.get("/:categorie/:fournisseur/:marque",authorize(),
    statistique.getStatPeriode)
    app.use("/api/stat",router);

}