import Controller from '@ember/controller';
import { action } from '@ember/object';
import {tracked} from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UAppSettingsController extends Controller {

    @tracked port;
    @tracked ip;

    @service
    highstreetlyPrinter

    @tracked
    printerSettings

    @action
    save() {
        var localStorage = window.localStorage
        localStorage.setItem('printer-port', this.port)
        localStorage.setItem('printer-ip', this.ip)
    }

    @action 
    test(){
        this.highstreetlyPrinter.printTest()
    }

}
