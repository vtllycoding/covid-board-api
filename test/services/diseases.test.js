const assert = require('assert');
const app = require('../../src/app');

describe('\'diseases\' service', () => {
  it('registered the service', () => {
    const service = app.service('diseases');

    assert.ok(service, 'Registered the service');
  });
});
