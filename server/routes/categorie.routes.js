    
module.exports = app => {
    const article = require("../controllers/article.controller.js");
    const categorie = require("../controllers/categorie.controller.js");
    const scategorie = require("../controllers/scategorie.controller.js");
    const sscategorie = require("../controllers/sscategorie.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //categorie
    router.post("/",authorize(), categorie.create);

    router.get("/",authorize(),
    categorie.findAll);

    router.put("/:id",authorize(),
    categorie.update
    );

    router.delete("/:id",authorize(),
    categorie.delete
    );

    router.get("/:id",authorize(),
    categorie.findOne
    );
    app.use("/api/categorie",router);


}