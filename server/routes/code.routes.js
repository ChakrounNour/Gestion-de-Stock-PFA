
module.exports = app => {
    const authorize = require('_helpers/authorize')
    const Role = require('_helpers/role');
    const code = require("../controllers/code.controller.js");
    const express = require('express');
    const router = express.Router();
    router.post("/articleId",authorize(),
        code.create);
    router.get("/:id",authorize(),
        code.findOne
    );
    router.get("/",authorize(),
    code.findAll
);
router.put("/:id",authorize(),
code.update
);

router.delete("/:id",authorize(),
code.delete
);
    app.use("/api/code",router);
}
