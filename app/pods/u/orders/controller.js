import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrdersController extends Controller {
  queryParams = ['status'];

  @service
  session

  @service
  router

  @tracked status = null;

  @tracked filtersVisible = false;

  constructor(){
    super(...arguments);
    this.session.on('invalidationSucceeded', () => {
        this.router.transitionTo('index');
      });
  }

  @action toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  @action
  signout(){
      this.session.invalidate();
  }
}
