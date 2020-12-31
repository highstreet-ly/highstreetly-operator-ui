import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
@classic
export default class ApplicationRoute extends Route {

    // @service session;

    // beforeModel(transition) {
    //   this.get('session').requireAuthentication(transition, 'login');
    // }
}
