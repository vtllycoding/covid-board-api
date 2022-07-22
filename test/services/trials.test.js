const assert = require('assert');
const app = require('../../src/app');

describe('\'trials\' service', () => {
  it('registered the service', () => {
    const service = app.service('trials');

    assert.ok(service, 'Registered the service');
  });
});
