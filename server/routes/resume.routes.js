
module.exports = app => {
    const qte_commander= require("../controllers/resume.controller.js");

    const authorize = require('_helpers/authorize')

    const express = require('express');
    const router = express.Router();
    router.get("/tabResp/:magasin_id",authorize(),qte_commander.GetTabRespon)
    router.get("/pourcentageResp/:magasin_id",authorize(),qte_commander.GetPourcentageResp)
    router.get("/resumeRes/:magasin_id",authorize(),
    qte_commander.GetResumeByResp)
    router.get("/",authorize(),
    qte_commander.GetResumeByAdmin)

    router.get("/pourcentage",authorize(),qte_commander.GetPourcentageAdmin)

    router.get("/tabAdmin",authorize(),
    qte_commander.GetTabAdmin)
   
    
    app.use("/api/resume",router);
}