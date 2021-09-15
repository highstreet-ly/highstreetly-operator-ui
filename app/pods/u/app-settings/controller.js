import Controller from '@ember/controller';
import { action } from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class UAppSettingsController extends Controller {

    @tracked port;
    @tracked ip;

    @action
    save() {
        var localStorage = window.localStorage
        localStorage.setItem('printer-port', this.port)
        localStorage.setItem('printer-ip', this.ip)
    }
}
