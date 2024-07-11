
module.exports = app => {
    const fournisseur = require("../controllers/fournisseur.controller.js");
    const authorize = require('_helpers/authorize')
    const express = require('express');
    const router = express.Router();
    router.post("/", authorize(),
    fournisseur.create);
    router.get("/:id",authorize(),
    fournisseur.findOne
    );
    router.get("/",authorize(),
    fournisseur.findAll
);
    router.put("/:id",authorize(),
    fournisseur.update
    );
    router.delete("/:id",authorize(),
    fournisseur.delete
    );
    app.use("/api/fournisseur",router);
}