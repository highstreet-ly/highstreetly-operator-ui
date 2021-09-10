import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  currentUser;

  setupController(controller, models) {
    if (!this.currentUser.eventOrganiser) {
      controller.set('noOrganiser', true);
    }

    controller.set('organiser', this.currentUser.eventOrganiser);

  }
}
