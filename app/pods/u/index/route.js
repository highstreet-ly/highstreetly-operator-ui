import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  currentUser;

  async model() {

    let organiser = await this.store.findRecord('event-organiser', this.currentUser.eventOrganiser.id, {
      include: 'event-series.event-instances',
    })

   

    return {
      organiser: organiser,
    };
  }

  setupController(controller, models) {
    if (!this.currentUser.eventOrganiser) {
      controller.set('noOrganiser', true);
    }

    controller.set('organiser', models.organiser);
  }
}
