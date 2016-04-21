import {annotate} from 'angular-annotation-decorator/src/index';

import 'common/styles/index.css!';
import template from './index.html!text';

@annotate('dataService')
class controller {
  constructor (dataService) {
    this.dataPackage.resources.forEach(resource => {
      dataService.normalizePackage(resource.url, resource.data);
    });
  }
}

export default {
  controller,
  template,
  bindings: {
    dataPackage: '<package'
  }
};
