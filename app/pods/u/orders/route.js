import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class OrdersRoute extends Route {
  @service
  store;

  async model(params) {
    return await this.store.findRecord('event-instance', params.event_instance_id);
  }

  setupController(controller, model) {
    controller.set('eventInstance', model);
    controller.set('orderQuery', {
      filter: `expr:and(equals(event-instance-id,'${model.id}'),equals(status,'Paid'))`,
      "fields[orders]": 'human-readable-id,confirmed-on,status,is-click-and-collect,is-national-delivery,owner-email',
      "fields[order-tickets]":"ticket-details",
      "fields[ticket-details]": 'price,quantity,display-name,name',
      "fields[product-extras]": 'price,name',
      include: 'tickets,tickets.ticket-details,tickets.ticket-details.product-extras',
      sort: '-paid-date-time',
      page: {
        'size': 100,
        'number': 1
      }
    });
  }
}
