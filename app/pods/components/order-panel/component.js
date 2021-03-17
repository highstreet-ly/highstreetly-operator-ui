import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class OrderPanelComponent extends Component {
    imageOptions = 'h_80'

    @action
    async setProcessing(order) {
        await order.save({ adapterOptions: { command: "SetOrderProcessing" } })
    }

    @action
    refund() {
        alert();
    }
}
