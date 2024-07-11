
module.exports = app => {
    const authorize = require('_helpers/authorize')
    const Role = require('_helpers/role');
    const client = require("../controllers/client.controller.js");
    const express = require('express');
    const router = express.Router();
    router.post("/",authorize(),
        client.create);
    router.get("/:id",authorize(),
        client.findOne
    );
    router.get("/",authorize(),
    client.findAll
);
    router.put("/:id",authorize(),
        client.update
    );
    router.delete("/:id",authorize(),
        client.delete
    );
    app.use("/api/client",router);
}
