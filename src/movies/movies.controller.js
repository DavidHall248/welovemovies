const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  movieId = request.params.movieId;
  movie = await service.read(movieId);
  if(movie){
    response.locals.movie = movie;
    return next();
  }
  next({status:404,message:"Id cannot be found."});
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  movies = await service.list(request.query.is_showing);
  response.json({data:movies});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
