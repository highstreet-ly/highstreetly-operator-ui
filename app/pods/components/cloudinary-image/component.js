import { attributeBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import Env from 'highstreetly-operator-ui/config/environment';

@tagName('img')
@attributeBindings('computedSrc:src', 'alt')
export default class CloudinaryImage extends Component {
  alt = null;
  options = '';
  filetype = 'jpg';

  @computed('imageId')

  get computedSrc() {
    const imageId = this.imageId ? this.imageId : 'generic/placeholder';

    return "https://res.cloudinary.com/" + Env.cloudinary.cloudName + "/image/upload/" + this.options + '/' + imageId + '.' + this.filetype;
  }
}
