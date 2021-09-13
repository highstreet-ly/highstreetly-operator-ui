import DS from 'ember-data';
import Env from 'sonaticket-dashboard/config/environment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";
import classic from 'ember-classic-decorator';

@classic
export default class ApplicationAdapter extends JSONAPIAdapter.extend(DataAdapterMixin) {
  @service session;

  host = Env.sonatribe.DashApi;
  namespace = Env.sonatribe.apiNamespace;

  @computed('session.{data.authenticated.access_token,isAuthenticated}')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    if (this.command) {
      headers['Command-Type'] = this.command;
      this.command = null;
    }

    return headers;
  }

  updateRecord(store, type, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.command) {
      this.command = snapshot.adapterOptions.command;
    }

    this._super(...arguments);
  }

  /* handleResponse(status) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
    }
    return this._super(...arguments);
  } */
}
