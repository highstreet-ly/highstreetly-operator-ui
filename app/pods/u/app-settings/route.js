import Route from '@ember/routing/route';

export default class UAppSettingsRoute extends Route {
    model() {
        var localStorage = window.localStorage
        return {
            port: localStorage.getItem('printer-port'),
            ip: localStorage.getItem('printer-ip')
        }
    }

    setupController(controller, model) {
        controller.set('port', model.port);
        controller.set('ip', model.ip);
    }
}
