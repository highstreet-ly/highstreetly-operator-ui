import Model, { belongsTo }  from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class OrderTicketModel extends Model {

    @attr('raw')
    attendee;

    @belongsTo('ticketTypeConfiguration',  { async: true })
    ticketTypeConfiguration;

}
