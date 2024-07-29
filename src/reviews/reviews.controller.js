const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  //console.log(request.method + " " + request.params.reviewId);
  review = await service.read(request.params.reviewId);
  if(review){
    response.locals.review = review;
    return next();
  }
  
  next({status:404,message:"ReviewId cannot be found." });
}

async function destroy(request, response) {
  // TODO: Write your code here
  await service.destroy(request.params.reviewId);
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
  reviews = await service.list(request.params.movieId);
  
  for(i in reviews){
    reviews[i].critic = {
      preferred_name : reviews[i].preferred_name,
      surname : reviews[i].surname,
      organization_name : reviews[i].organization_name
    }
  }

  response.json({data : reviews});
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  //console.log("UPDATE " + request.params.reviewId);
  // TODO: Write your code here
  updatedReview = {
        ...request.body.data,
    review_id : response.locals.review.review_id
  };
  
  review = await service.update(updatedReview);
  response.json({data:review});
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
