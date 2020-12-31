import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
@classic
export default class ApplicationRoute extends Route {

    @service session
    @service router
    @service currentUser

    beforeModel() {
        this._super(...arguments);
        return this._loadCurrentUser();
    }

    _loadCurrentUser() {
        return this.currentUser.load().catch(() => {
          this.session.invalidate()
        });
      }
}
