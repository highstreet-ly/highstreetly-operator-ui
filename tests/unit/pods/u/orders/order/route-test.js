import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | u/orders/order', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:u/orders/order');
    assert.ok(route);
  });
});
