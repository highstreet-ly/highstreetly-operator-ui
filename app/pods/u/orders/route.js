import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class OrdersRoute extends Route {
  @service
  store;

  async model(params) {
    return {
      eventInstance: await this.store.findRecord('event-instance', params.event_instance_id)
    };
  }

  setupController(controller, model) {
    controller.set('eventInstance', model.eventInstance);
    controller.set('orderQuery', {
      filter: {
        'event-instance-id': model.eventInstance.id,
        'status-text': 'Paid'
      },
      sort: '-created-on',
      page: {
        'size': 10,
        'number': 1
      }
    });
    console.log(controller.get('orderQuery'));
  }
}
