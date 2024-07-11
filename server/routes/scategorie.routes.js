    
module.exports = app => {
    const article = require("../controllers/article.controller.js");
    const scategorie = require("../controllers/scategorie.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //categorie
    router.post("/:categorieId",authorize(), scategorie.create);

    router.get("/",authorize(),
    scategorie.findAll);

    router.put("/:id",authorize(),
    scategorie.update
    );

    router.delete("/:id",authorize(),
    scategorie.delete
    );

    router.get("/:id",authorize(),
    scategorie.findOne
    );
    app.use("/api/scategorie",router);


}