import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    session

    redirect(){
        if (!this.session.isAuthenticated) {
            this.transitionTo('login');
        } else {

            this.transitionTo('u.index');
        }
    }
}
