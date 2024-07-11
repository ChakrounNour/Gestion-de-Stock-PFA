
module.exports = app => {
    const authorize = require('_helpers/authorize')
    const Role = require('_helpers/role');
    const alerte = require("../controllers/alerte.controller.js");
    const express = require('express');
    const router = express.Router();
    router.post("/",authorize(),
        alerte.create);
  
    router.get("/:id",authorize(),
        alerte.findOne
    );
    router.get("/",authorize(),
    alerte.findAll
    );
    router.delete("/:id",authorize(),
    alerte.delete
    );
    app.use("/api/alerte",router);
}
