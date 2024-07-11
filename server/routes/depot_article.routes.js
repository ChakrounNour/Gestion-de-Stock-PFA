
module.exports = app => {
    const authorize = require('_helpers/authorize')
    const Role = require('_helpers/role');
    const depot = require("../controllers/depot_article.controller.js");
    const express = require('express');
    const router = express.Router();
    router.post("/:stock_id/:article_Id",authorize(),
        depot.create);
    router.get("/:id",authorize(),
        depot.findOne
    );
    router.get("/findAll/:article_id",authorize(),
    depot.findAll
);
    router.put("/:id",authorize(),
        depot.update
    );
    router.delete("/:id",authorize(),
        depot.delete
    );
    app.use("/api/depot_article",router);
}
