import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Env from 'highstreetly-operator-ui/config/environment';

@classic
export default class OrdersRoute extends Route {
  @service
  store;

  queryParams = {
    status: {
      refreshModel: true
    }
  };

  async model(params) {
    return {
      eventInstance: await this.store.findRecord('event-instance', params.event_instance_id),
      status: params.status
    };
  }

  setupController(controller, model) {
    controller.set('version', Env.sonatribe.Version);
    controller.set('eventInstance', model.eventInstance);
    let filter = '';

    if(model.status){
      filter = `expr:and(equals(event-instance-id,'${model.eventInstance.id}'),equals(status,'${model.status}'))`
    }else{
      filter = `expr:equals(event-instance-id,'${model.eventInstance.id}')`
    }

    controller.set('orderQuery', {
      filter: filter,
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
