// Initializes the `criterias` service on path `/criterias`
const { Criterias } = require('./criterias.class');
const createModel = require('../../models/criterias.model');
const hooks = require('./criterias.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/criterias', new Criterias(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('criterias');

  service.hooks(hooks);
};
