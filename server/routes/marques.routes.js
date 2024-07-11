
module.exports = app => {
    const authorize = require('_helpers/authorize')
    const Role = require('_helpers/role');
    const marque = require("../controllers/marque.controller.js");
    const express = require('express');
    const router = express.Router();
    router.post("/",authorize(),
        marque.create);
    router.get("/:id",authorize(),
        marque.findOne
    );
    router.get("/",authorize(),
    marque.findAll
);
router.put("/:id",authorize(),
marque.update
);


router.delete("/:id",authorize(),
marque.delete
);
    app.use("/api/marque",router);
}
