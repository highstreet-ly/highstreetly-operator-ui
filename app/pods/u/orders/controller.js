import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';

export default class OrdersController extends Controller {
  queryParams = ['status'];

  @tracked status = null;
}
