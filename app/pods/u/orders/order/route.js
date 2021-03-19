import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/addon-test-support';

export default class OrdersOrderRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  store;

   model(params) {
    return  {
      shopId: params.event_instance_id,
      order: this.store.findRecord('order', params.order_id)
    }
  }

  setupController(controller, model) {
    controller.set('order', model.order);
    controller.set('shopId', model.shopId);
  }
}
