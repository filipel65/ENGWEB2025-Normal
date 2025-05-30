const express = require("express");
const router = express.Router();
const editions_controller = require("../controllers/editions-controller");


// métodos que incluam parÂmetros "?param="
router.get("/", function(req,res,next) {
    if (req.query.org) {
        editions_controller.getbyOrg(req.query.org)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
    } else {
        editions_controller.getEditions()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
    }
    
});

router.get("/:id", function(req,res,next) {
    editions_controller.getEditionbyID(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

router.post("/", function(req,res,next) {
    editions_controller.insert(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

router.put("/:id", function(req,res,next) {
    editions_controller.update(req.body,req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

router.delete("/:id", function(req,res,next) {
    editions_controller.delete(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
});

module.exports = router;