import Model, { belongsTo, hasMany } from '@ember-data/model';
import attr from 'ember-data/attr';

export default class ProductExtraModel extends Model {
    @attr('number')
    price

    @attr('boolean')
    selected

    @attr('number')
    itemCount

    @attr('string')
    description

    @attr('string')
    name

    @belongsTo('productExtraGroup')
    productExtraGroup
}
