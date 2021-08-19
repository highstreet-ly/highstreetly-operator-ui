import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
@classic
export default class ApplicationRoute extends Route {

  @service session
  @service router
  @service currentUser
  @service highstreetlySignalr

  model() {
    if (this.session.isAuthenticated) {
      this.highstreetlySignalr.initialize(this.currentUser.user.eoid);
    }
  }

  async beforeModel() {
    this._super(...arguments);
    await this._loadCurrentUser();
  }

  async sessionAuthenticated() {
    let _super = this._super;
    await this._loadCurrentUser();
    _super.call(this, ...arguments);
  }

  async _loadCurrentUser() {
    try {
      await this.currentUser.load()
    } catch (e) {
      this.session.invalidate()
    }
    if (this.session.isAuthenticated) {
      if (!this.currentUser.isOperator) {

       await  this.session.invalidate()
      }
    }
  }
}
