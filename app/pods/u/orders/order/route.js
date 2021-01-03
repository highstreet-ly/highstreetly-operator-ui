import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrdersOrderRoute extends Route {
  @service
  store;

  async model(params) {
    return {
      order: await this.store.findRecord('order', params.order_id)
    }
  }

  setupController(controller, model) {
    controller.set('order', model.order);
  }
}
