const assert = require('assert');
const app = require('../../src/app');

describe('\'criterias\' service', () => {
  it('registered the service', () => {
    const service = app.service('criterias');

    assert.ok(service, 'Registered the service');
  });
});
