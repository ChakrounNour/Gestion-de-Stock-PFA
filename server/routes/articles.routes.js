
module.exports = app => {
    const article = require("../controllers/article.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //magasin
    router.post("/:sscategorieId/:fournisseurId/:depotId/:marqueId",authorize(), article.create);
    router.get("/qte",authorize(),article.getQte)
    router.get("/",authorize(),
    article.findAll);

    router.put("/:id",authorize(),
    article.update
    );
    router.get("/ByMagasin/:stockId",authorize(),article.findAllByMagasin)
    router.get("/code/:id",authorize(),article.findAllCode)
    router.delete("/:id",authorize(),
    article.delete
    );

    router.get("/:id",authorize(),
    article.findById
    );
    router.get("/find/:nomA",authorize(),
    article.find
    );

    
    app.use("/api/article",router);
}