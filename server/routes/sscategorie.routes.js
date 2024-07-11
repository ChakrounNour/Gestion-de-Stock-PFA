    
module.exports = app => {
    const article = require("../controllers/article.controller.js");
    const sscategorie = require("../controllers/sscategorie.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //categorie
    router.post("/:categorieSId",authorize(), sscategorie.create);

    router.get("/",authorize(),
    sscategorie.findAll);

    router.put("/:id",authorize(),
    sscategorie.update
    );

    router.delete("/:id",authorize(),
    sscategorie.delete
    );

    router.get("/:id",authorize(),
    sscategorie.findOne
    );
    app.use("/api/sscategorie",router);


}