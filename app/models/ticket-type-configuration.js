import Model from '@ember-data/model';
import attr from 'ember-data/attr';

export default class TicketTypeConfigurationModel extends Model {

    @attr('string')
    name

    @attr('string')
    description

    @attr('string')
    mainImageId

    @attr('number')
    price

}
