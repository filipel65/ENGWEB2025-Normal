const express = require("express");
const router = express.Router();
const editions_controller = require("../controllers/editions-controller");


// métodos que incluam parÂmetros "?param="
router.get("/", function(req,res,next) {
    if (req.query.papel === "org") {
        editions_controller.getPaisesByOrg()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
    } else if (req.query.papel === "venc") {
        editions_controller.getPaisesByVenc()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
    }
    
});

module.exports = router;