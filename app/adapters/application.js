import DS from 'ember-data';
import Env from 'highstreetly-operator-ui/config/environment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service'

export default DS.JSONAPIAdapter.extend({
  session: service(),
  host: Env.sonatribe.OpsApi,
  namespace: Env.sonatribe.apiNamespace,
  headers: computed('session.session.authenticated.access_token', function () {


    let token = this.get('session.session.authenticated.access_token');
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    if (this.command) {
      let contentType = `${this.command}`
      headers['Command-Type'] = contentType
    }

    return headers;
  }).volatile(),
  updateRecord(store, type, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.command) {
      this.set('command', snapshot.adapterOptions.command)
    }

    return this._super(...arguments)
  }
});
