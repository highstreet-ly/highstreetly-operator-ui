import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class OrderPanelComponent extends Component {
  imageOptions = 'h_30';
  @tracked loading = false;

  @service
  highstreetlyPrinter

  @service
  eventBus;

  @tracked
  printerConfigured = false

  @tracked 
  printing = false

  constructor(){
    super(...arguments);
    let localStorage = window.localStorage

    this.highstreetlyPrinter.onPrintingStarted = () =>{
      this.printing = true
    }

    this.highstreetlyPrinter.onPrintingFinished = () =>{
      this.printing = false
    }

    let settings = {
        port: localStorage.getItem('printer-port'),
        ip: localStorage.getItem('printer-ip')
    }

    if(settings.port && settings.ip){
      this.printerConfigured = true
    }

  }

  @action
  async setProcessing(order) {
    this.loading = true;
    await order.save({ adapterOptions: { command: "SetOrderProcessing" } })
    order.set('status', 'Processing')
    this.eventBus.publish('SetOrderProcessing', order.id)
    this.loading = false;
  }

  @action
  async setComplete(order) {
    this.loading = true;
    await order.save({ adapterOptions: { command: "SetOrderProcessingComplete" } })
    this.eventBus.publish('SetOrderProcessingComplete', order.id)
    this.loading = false;
  }

  @action
  reprint() {
    let message = { OrderId: this.args.order.id }

    this.highstreetlyPrinter.print(message)
  }
}
