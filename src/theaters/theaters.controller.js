const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  theaters = await service.list();
  response.json({data : theaters});
}

module.exports = {
  list: asyncErrorBoundary(list),
};
