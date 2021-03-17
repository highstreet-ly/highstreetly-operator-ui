import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  currentUser;

  async model() {

    let organiser = await this.store.query('event-organiser', {
      include: 'event-series.event-instances',
      'filter[event-series.event-instances]': `expr:and(equals(deleted,'${false}'),equals(event-organiser-id,'${this.currentUser.eventOrganiser.id}'))`
    })

    let eventSeries = await organiser.firstObject.get('eventSeries');

    let eventInstances = [];

    eventSeries.forEach((es) => {
      es.eventInstances.forEach((ei) => {
        eventInstances.push(ei)
      })
    })

    return {
      eventSeries: eventSeries,
      operatorServices: eventInstances
    };
  }

  setupController(controller, models) {
    if (!this.currentUser.eventOrganiser) {
      controller.set('noOrganiser', true);
    }

    controller.set('organiser', this.currentUser.eventOrganiser);
    controller.set('operatorServices', models.operatorServices);
    controller.set('eventSeries', models.eventSeries);
  }
}
