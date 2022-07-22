const users = require('./users/users.service.js')
const trials = require('./trials/trials.service.js');
const results = require('./results/results.service.js');
const diseases = require('./diseases/diseases.service.js');
const criterias = require('./criterias/criterias.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(trials);
  app.configure(results);
  app.configure(diseases);
  app.configure(criterias);
}
