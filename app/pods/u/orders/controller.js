import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import { action } from '@ember/object';

export default class OrdersController extends Controller {
  queryParams = ['status'];

  @tracked status = null;

  @tracked filtersVisible = false;

  @action toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }
}
