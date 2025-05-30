const express = require("express");
const router = express.Router();
const editions_controller = require("../controllers/editions-controller");


// métodos que incluam parÂmetros "?param="
router.get("/", function(req,res,next) {
    editions_controller.getInterpretes()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

module.exports = router;