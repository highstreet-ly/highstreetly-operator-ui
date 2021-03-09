import Model, { belongsTo }  from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class OrderTicketModel extends Model {

    @belongsTo('ticketTypeConfiguration')
    ticketTypeConfiguration;

    @belongsTo('ticketDetail')
    ticketDetails;

    @belongsTo('order')
    order;

}
