import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrdersOrderRoute extends Route {
  @service
  store;

  async model(params) {
    return {
      shopId: params.event_instance_id,
      order: await this.store.findRecord('order', params.order_id)
    }
  }

  setupController(controller, model) {
    controller.set('order', model.order);
    controller.set('shopId', model.shopId);
  }
}
