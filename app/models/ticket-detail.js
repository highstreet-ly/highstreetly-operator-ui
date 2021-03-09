import Model, { hasMany } from '@ember-data/model';
import attr from 'ember-data/attr';

export default class TicketDetailModel extends Model {
    @hasMany('productExtra')
    productExtras

    @attr('string')
    name

    @attr('string')
    displayName

    @attr('number')
    price

    @attr('number')
    quantity
}
