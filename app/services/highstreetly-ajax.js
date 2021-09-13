import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import AjaxService from 'ember-ajax/services/ajax';
import Env from 'highstreetly-operator-ui/config/environment';
import fetch from 'fetch';

export default class HighstreetlyAjaxService extends AjaxService {

    @service
    session

    constructor() {
        super(...arguments);
        this.host = "/"
        this.crossDomain = true
        this.withCredentials = true
        this.cache = true

        let trustedDomains = Env.sonatribe.AllowedDomains.split(',');
        this.trustedHosts = trustedDomains;
    }

    @computed('session.isAuthenticated')
    get headers() {
        let headers = {};
        const authToken = this.get('session.session.content.authenticated.access_token');

        if (authToken) {
            headers['Authorization'] = 'Bearer ' + authToken;
        }
        headers['Accept'] = 'application/vnd.api+json';
        headers['Content-Type'] = 'application/vnd.api+json';
        return headers;
    }

    async request(url, options) {
      let response = await fetch(url, {
        headers: this.headers
      });
      let result = await response.json();
      return result;

        /* return await super.request(url, options).catch((error) => {
            if (error.payload && error.payload === 'Unauthorized') {
                if (this.get('session.isAuthenticated')) {
                    this.session.invalidate()
                }
            }
        }); */
    }
}
