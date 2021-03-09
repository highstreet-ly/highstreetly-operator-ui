import Model, { belongsTo }  from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class OrderTicketModel extends Model {

    @belongsTo('ticketTypeConfiguration',  { async: true })
    ticketTypeConfiguration;

    @belongsTo('ticketDetails')
    ticketDetails;

    @belongsTo('order')
    order;

}
