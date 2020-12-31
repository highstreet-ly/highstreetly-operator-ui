import Model from '@ember-data/model';
import attr from 'ember-data/attr';

export default class UserModel extends Model {
    @attr('string')
    email

    @attr('string')
    firstName

    @attr('string')
    lastName

    @attr('number')
    avatarType

    @attr('string')
    uploadedAvatarId
}
