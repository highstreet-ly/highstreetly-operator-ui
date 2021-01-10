import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { later } from '@ember/runloop';
import { tracked } from "@glimmer/tracking";
import { relativeTime, wordsFn } from 'time-ago-lite';

@classic
export default class OrdersPanel extends Component {
    @service
    store;

    @tracked
    timeAgoText = '';

    init() {
        super.init(...arguments);

        const processor = (number, unitKey , isInPast) => {
          const words = {
            now: 'just now',
            minute: ['{{n}} mins', '{{n}} mins'],
            hour: ['{{n}} hour', '{{n}} hours'],
            day: ['{{n}} day', '{{n}} days'],
            month: ['{{n}} month', '{{n}} months'],
            year: ['{{n}} year', '{{n}} years'],
          };
          if (unitKey === 'now') {
            return words['now'];
          }
          const word =
            number === 1
              ? words[unitKey][0].replace('{{n}}', number.toString())
              : words[unitKey][1].replace('{{n}}', number.toString());
          return isInPast ? `${word} ago` : `in ${word}`;
        };
        const timeAgo = relativeTime(processor);

        this.setTimeAgo(timeAgo);
    }

    setTimeAgo(timeAgo) {
      this.timeAgoText = timeAgo(this.date);

      later(this, function() {
        this.setTimeAgo(timeAgo);
      }, 10000);
    }

}
