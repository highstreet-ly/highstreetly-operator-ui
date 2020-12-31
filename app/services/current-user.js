// import Service from '@ember/service';
// import { inject as service } from '@ember/service';
// import Env from 'highstreetly-operator-ui/config/environment';

// export default class CurrentUserService extends Service {
//     @service
//     highstreetlyAjax

//     @service
//     store

//     @service
//     session

//     sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }

//     async load() {
//         if (this.loaded) {
//             return;
//         }

//         if (!this.loading) {
//             await this.loadInternal();
//         } else {
//             do {
//                 /*console.log('spinning our wheels while the user is loaded');*/
//                 await this.sleep(1000);
//             }
//             while (this.loading);
//         }
//     }

//     async loadInternal() {
//         this.set('loading', true);

//         try {
//             if (this.session.isAuthenticated) {
//                 let user = await this.sonaticketAjax.request(ENV.sonatribe.authenticationURL + '/connect/userinfo');
//                 this.set('user', user);
//                 //this.set('emailHash', this.md5(user.email));
//                 this.set('firstLetter', user.email.slice(0, 1));
//                 this.set('loaded', true);

//                 let userModel = await this.store.findRecord('user', user.sub);

//                 this.set('userModel', userModel);

//                 if (user.eoid) {
//                     let organiser = await this.store.findRecord('event-organiser', user.eoid);
//                     this.set('eventOrganiser', organiser);
//                     //await this.getStats();
//                 }

//                 return user;
//             }
//         }
//         catch (e) {
//             this.session.invalidate();
//         }
//         finally {
//             this.set('loading', false);
//         }
//     }

//     async isInRole(role) {

//         function findRole(element) {
//             return element === role;
//         }

//         if (!this.user) {
//             await this.load();
//         }

//         if (!this.user.role) {
//             // this user hasn't created an event yet so we need to get them to do that
//             // before we can progress anywhere
//             // https://sonaticket.myjetbrains.com/youtrack/issue/st-20
//         }

//         if (this.user.role && this.user.role.find && this.user.role.find(findRole)) {
//             return true;
//         }

//         /*console.log('dumb situ ahead');
//         console.log('comparing this.user.role ' + this.user.role  + ' to findRole' + role)*/

//         // this is dumb but if there is only one element in the roles array
//         // it shows up as a string not a one element array
//         if (this.user.role && this.user.role === role) {
//             return true;
//         }

//         return false;
//     }

//     async reloadEventOrganiser() {
//         let user = await this.sonaticketAjax.request(ENV.sonatribe.authenticationURL + '/connect/userinfo');
//         return await this.store.findRecord('event-organiser', user.eoid);
//     }
// }
