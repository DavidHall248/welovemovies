const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router.use("/:movieId/reviews", reviewsRouter);

router.use("/:movieId/theaters", theatersRouter);

router.route("/:movieId/critics")
  .all((req,res,next) => {next({status:404})});

router.route("/:movieId")
  .get(controller.read);

router.route("/")
  .get(controller.list);

module.exports = router;
