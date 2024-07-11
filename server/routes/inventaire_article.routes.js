
module.exports = app => {
    const Inventaire_article = require("../controllers/inventaire_article.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //magasin
    router.post("/:inventaire_Id/:article_Id",authorize(), Inventaire_article.create);
    router.get("/rapport/:article_Id",authorize(), Inventaire_article.getRapport);

    
    router.get("/" ,authorize(),Inventaire_article.findAll)



    router.put("/:id",authorize(),
    Inventaire_article.update
    );

    router.delete("/:id",authorize(),
    Inventaire_article.delete
    );

   

    
    app.use("/api/inventaire_art",router);
}