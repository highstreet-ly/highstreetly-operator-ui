import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class IndexRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  currentUser;

 async setupController(controller, models) {

    controller.set('loading', true)

    if (!this.currentUser.eventOrganiser) {
      controller.set('noOrganiser', true);
    }

    controller.set('organiser', this.currentUser.eventOrganiser);

    for (let esi = 0; esi < this.currentUser.eventOrganiser.eventSeries.length; esi++) {
      await this.currentUser.eventOrganiser.eventSeries
      let s = this.currentUser.eventOrganiser.eventSeries.objectAt(esi)

      for (let eii = 0; eii < s.eventInstances.length; eii++) {

        let ei = s.eventInstances.objectAt(eii)

        var rtpResults  = await this.store.query('order', {
          filter: `expr:and(equals(event-instance-id,'${ei.id}'),equals(status,'Paid'))`,
          page: {
            'size': 0,
            'number': 1
          }
        })

        ei.set('readyToProcessCount', rtpResults.meta['total-resources'])


        var pResults  = await this.store.query('order', {
          filter: `expr:and(equals(event-instance-id,'${ei.id}'),equals(status,'Processing'))`,
          page: {
            'size': 0,
            'number': 1
          }
        })

        ei.set('processingCount', pResults.meta['total-resources'])


        var pcResults  = await this.store.query('order', {
          filter: `expr:and(equals(event-instance-id,'${ei.id}'),equals(status,'ProcessingComplete'))`,
          page: {
            'size': 0,
            'number': 1
          }
        })

        ei.set('processingCompleteCount', pcResults.meta['total-resources'])

      }

    }

    controller.set('loading', false)

  }
}
