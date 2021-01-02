import Model from '@ember-data/model';
import attr from 'ember-data/attr';

export default class EventInstanceModel extends Model {
  @attr('string')
  name;

  @attr('boolean')
  isPublished;
}
