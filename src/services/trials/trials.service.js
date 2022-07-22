// Initializes the `trials` service on path `/trials`
const { Trials } = require('./trials.class');
const createModel = require('../../models/trials.model');
const hooks = require('./trials.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trials', new Trials(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trials');

  service.hooks(hooks);
};
