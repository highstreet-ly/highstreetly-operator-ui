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
      filter: {
        'event-instance-id': model.id,
        'status-text': 'Paid'
      },
      sort: '-confirmed-on',
      page: {
        'size': 100,
        'number': 1
      }
    });
  }
}
