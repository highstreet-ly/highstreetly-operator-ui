import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/orders/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/orders/index');
    assert.ok(route);
  });
});
