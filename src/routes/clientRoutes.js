const express = require("express");
const clientController = require("../controllers/clientController");

const router = express.Router();

router.get("/", clientController.index);
router.get("/new", clientController.newForm);
router.post("/", clientController.create);

router.get("/:id/edit", clientController.editForm);
router.put("/:id", clientController.update);

router.delete("/:id", clientController.delete);

module.exports = router;