const express = require("express");
const tableController = require("../controllers/tableController");

const router = express.Router();

router.get("/", tableController.index);
router.get("/new", tableController.newForm);
router.post("/", tableController.create);

router.get("/:id/edit", tableController.editForm);
router.put("/:id", tableController.update);

router.delete("/:id", tableController.delete);

module.exports = router;