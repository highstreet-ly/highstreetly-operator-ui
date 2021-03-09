import Model, { belongsTo, hasMany } from '@ember-data/model';
import attr from 'ember-data/attr';

export default class ProductExtraGroupModel extends Model {
    @attr('number')
    maxSelectable

    @attr('number')
    minSelectable

    @attr('string')
    name

    @attr('string')
    description

    @belongsTo('ticketTypeConfiguration')
    ticketTypeConfiguration

    @hasMany('productExtra')
    productExtras
}
