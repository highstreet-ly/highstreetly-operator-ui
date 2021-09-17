import Component from '@glimmer/component';
import { action } from "@ember/object";
import {tracked} from '@glimmer/tracking';

export default class OrderPanelComponent extends Component {
    imageOptions = 'h_30';
    @tracked loading = false;

    @action
    async setProcessing(order) {
      this.loading = true;
      await order.save({ adapterOptions: { command: "SetOrderProcessing" } })
      this.loading = false;
    }

    @action
    async setComplete(order) {
      this.loading = true;
      await order.save({ adapterOptions: { command: "SetOrderProcessingComplete" } })
      this.loading = false;
    }

    @action
    refund() {
        
    }
}
