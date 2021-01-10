import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class ItemsList extends Component {
    num = null;

    get truncatedItems() {
      if (this.num) {
        return this.items.slice(0, parseInt(this.num));
      } else {
        return this.items;
      }
    }

    get numberNotDisplayed() {
      return this.items.length - this.truncatedItems.length;
    }
}
