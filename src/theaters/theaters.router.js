const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

// TODO: Add your routes here
router.route("/")
  .get(controller.list);

module.exports = router;
