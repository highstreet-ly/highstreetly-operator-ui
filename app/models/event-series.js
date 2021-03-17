import Model, { hasMany } from '@ember-data/model';
import attr from 'ember-data/attr';
export default class EventSeriesModel extends Model {

    @hasMany('eventInstances')
    eventInstances

    @attr('string')
    name

    @attr('string')
    slug
}
