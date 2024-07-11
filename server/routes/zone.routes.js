
module.exports = app => {
    const authorize = require('_helpers/authorize')
    const Role = require('_helpers/role');
    const zone = require("../controllers/zone.controller.js");
    const express = require('express');
    const router = express.Router();
    router.post("/",authorize(),
        zone.create);
    router.get("/:id",authorize(),
        zone.findOne
    );
    router.get("/",authorize(),
    zone.findAll
);
router.put("/:id",authorize(),
zone.update
);


router.delete("/:id",authorize(),
zone.delete
);
    app.use("/api/zone",router);
}
