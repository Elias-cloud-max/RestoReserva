const express = require("express");
const reservationController = require(
  "../controllers/reservationController"
);

const router = express.Router();

router.get("/", reservationController.index);
router.get("/new", reservationController.newForm);
router.post("/", reservationController.create);

router.get("/:id/edit", reservationController.editForm);
router.put("/:id", reservationController.update);

router.delete("/:id", reservationController.delete);

module.exports = router;