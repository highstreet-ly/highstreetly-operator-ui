import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class OrderRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  store;

  async model(params) {
    return {
      order: await this.store.findRecord('order', params.order_id, {include: 'tickets,tickets.ticket-details,tickets.ticket-details.product-extras'})
    }
  }

  setupController(controller, model) {
    controller.set('order', model.order);
  }
}
