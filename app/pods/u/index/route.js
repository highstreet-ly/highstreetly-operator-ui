import Route from '@ember/routing/route';
import classic from 'ember-classic-decorator';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
@classic
export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {

    // @service
    // currentUser;

    async model(){

    }
}
