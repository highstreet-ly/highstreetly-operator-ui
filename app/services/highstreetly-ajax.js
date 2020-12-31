// import Service from '@ember/service';
// import { inject as service } from '@ember/service';
// import { computed } from '@ember/object';
// import AjaxService from 'ember-ajax/services/ajax';
// import Env from 'highstreetly-operator-ui/config/environment';

// export default class HighstreetlyAjaxService extends AjaxService {

//     @service
//     session

//     constructor() {
//         this.host = "/"
//         this.crossDomain = true
//         this.withCredentials = true
//         this.cache = true

//         let trustedDomains = Env.sonatribe.AllowedDomains.split(',');
//         this.trustedHosts = trustedDomains;
//     }

//     @computed('session.isAuthenticated')
//     get headers() {
//         let headers = {};
//         const authToken = this.get('session.session.content.authenticated.access_token');

//         if (authToken) {
//             headers['Authorization'] = 'Bearer ' + authToken;
//         }
//         headers['Accept'] = 'application/vnd.api+json';
//         headers['Content-Type'] = 'application/vnd.api+json';
//         return headers;
//     }

//     request(url, options) {
//         return this._super(url, options).catch((error) => {
//             if (error.payload && error.payload === 'Unauthorized') {
//                 if (this.get('session.isAuthenticated')) {
//                     this.session.invalidate()
//                 }
//             }
//         });
//     }
// }
