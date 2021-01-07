import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { later } from '@ember/runloop';
import { tracked } from "@glimmer/tracking";
import moment from 'moment';

@classic
export default class OrdersPanel extends Component {
    @service
    store;

    @tracked
    timeAgoText = '';

    init() {
        super.init(...arguments);
        this.setTimeAgo();
    }

    setTimeAgo() {
      this.timeAgoText = new moment(this.date).fromNow();

      later(this, function() {
        this.setTimeAgo();
      }, 10000);
    }

}
