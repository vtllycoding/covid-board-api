// Initializes the `diseases` service on path `/diseases`
const { Diseases } = require('./diseases.class');
const createModel = require('../../models/diseases.model');
const hooks = require('./diseases.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/diseases', new Diseases(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('diseases');

  service.hooks(hooks);
};
