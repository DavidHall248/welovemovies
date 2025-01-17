const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

// TODO: Add your routes here
router.route("/:reviewId")
  .put(controller.update)
  .delete(controller.destroy);

router.route("/")
  .get(controller.list);

module.exports = router;
