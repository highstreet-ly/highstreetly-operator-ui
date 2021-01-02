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
    this.route('orders', function() {
      this.route('index', { path:':event-instance-id' })
      this.route('order', { path:'order/:order-id' });
    });
  });
});
