import Component from '@glimmer/component';
import { action, computed } from '@ember/object';

export default class OperatorServicesPanelComponent extends Component {

    @action
    doSearch() { }

    @action
    unpublishEvent() { }

    @action
    publishEvent() { }
}
