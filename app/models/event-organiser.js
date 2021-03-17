import Model, { hasMany } from '@ember-data/model';
import attr from 'ember-data/attr';

export default class EventOrganiserModel extends Model {


    @hasMany('eventSeries')
    eventSeries

    @attr('string')
    name
}
