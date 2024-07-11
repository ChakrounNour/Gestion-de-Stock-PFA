module.exports = app => {
    const upload = require("../controllers/uploadFacture.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //categorie
    router.post("/fournisseur",authorize(), upload.createFournisseur);
    router.post("/client",authorize(), upload.createClient);


    app.use("/api/facture",router);


}