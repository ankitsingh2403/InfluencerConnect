const express = require("express");
const router = express.Router();
const controller = require("../controllers/campaignController");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.delete("/:id", controller.delete);

module.exports = router;
