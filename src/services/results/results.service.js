// Initializes the `results` service on path `/results`
const { Results } = require('./results.class');
const createModel = require('../../models/results.model');
const hooks = require('./results.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/results', new Results(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('results');

  service.hooks(hooks);
};
