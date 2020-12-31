import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
@classic
export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {

    @service
    currentUser;

    async model(){
        let eventSeries = await this.store.query('event-series', {
            filter: {
                'event-organiser-id': this.currentUser.eventOrganiser.id
            }
        })

        return {
            eventSeries: eventSeries,
            operatorServices: await this.store.query("event-instance", {
                fields: 'name,slug,start-date,end-date,is-published',
                page: {
                    'size': 5,
                    'number': 1
                },
                filter: {
                    'event-series-id': eventSeries.id
                    // 'end-date': `gt:${new moment().format()}`,
                    //'is-published': `eq:true`
                },
                sort: 'start-date'
            })
        }
    }

    setupController(controller, models) {
        if (!this.currentUser.eventOrganiser) {
            controller.set('noOrganiser', true)
        }

        controller.set('organiser', this.currentUser.eventOrganiser)
        controller.set('operatorServices', models.operatorServices)
        controller.set('eventSeries', models.eventSeries)
    }
}
