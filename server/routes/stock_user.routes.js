
module.exports = app => {
    const authorize = require('_helpers/authorize')
    const Role = require('_helpers/role');
    const StockUser = require("../controllers/stock_user.controller.js");
    const express = require('express');
    const router = express.Router();
    router.post("/:stock_id/:user_Id",authorize(),
    StockUser.create);
  
    router.get("/findAll/:article_id",authorize(),
    StockUser.findAll
);
    router.put("/:id",authorize(),
    StockUser.update
    );
    router.delete("/:id",authorize(),
    StockUser.delete
    );
    app.use("/api/stock",router);
}
