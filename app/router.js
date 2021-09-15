import EmberRouter from '@ember/routing/router';
import config from 'highstreetly-operator-ui/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('callback');
  this.route('u', function() {
    this.route('orders', { path:'orders/:event_instance_id' }, function() {
      this.route('order', { path:'order/:order_id' });
    });
    this.route('order', { path:'order/:order_id' });
    this.route('app-settings');
  });
});
