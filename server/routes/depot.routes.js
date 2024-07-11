
module.exports = app => {
    const authorize = require('_helpers/authorize')
    const Role = require('_helpers/role');
    const depot = require("../controllers/depot.controller.js");
    const express = require('express');
    const router = express.Router();
    router.post("/:userId/:zoneId",authorize(),
        depot.create);
    router.get("/:id",authorize(),
        depot.findOne
    );
    router.get("/",authorize(),
    depot.findAll
);
    router.get("/findByResp/:userId",authorize(),
    depot.GetDepot)
    router.put("/:id",authorize(),
        depot.update
    );
    router.delete("/:id",authorize(),
        depot.delete
    );
    app.use("/api/depot",router);
}
