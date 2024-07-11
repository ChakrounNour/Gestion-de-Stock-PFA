
module.exports = app => {
    const magasin = require("../controllers/magasin.controller.js");
    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    //magasin
    router.post("/:userId/:zoneId",authorize(), magasin.create);
    router.post("/addArt/:article_Id/:stock_id",authorize(),magasin.addArticle)
    router.get("/ByResponsable/:userId",authorize(),
    magasin.findAll);
    router.get("/",authorize(),
    magasin.GetAll);
    router.put("/:id",authorize(),
    magasin.update
    );
    router.get("/count/:userId",authorize(),magasin.countMagasin)
    router.delete("/:id",authorize(),
    magasin.delete
    );

    router.get("/:id",authorize(),
    magasin.findOne
    );

    router.get("/findCount2",authorize(),magasin.findCount2)

    router.put("/stock_article/:id",authorize(),
    magasin.updateQte)
  //  router.get("/mag/:userId",authorize(), 
    //magasin.findAllByUser);

    
    app.use("/api/magasin",router);
}