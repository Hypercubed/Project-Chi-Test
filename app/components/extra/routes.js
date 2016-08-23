import angular from 'angular';

import aboutHTML from 'components/about/about.md!md';
import errorHTML from 'components/error/error.html!text';

// examples
import indexComponent from './index';
import trainsComponent from './trains/trains';
import hexbinComponent from './hexbin/hexbin';

routeConfig.$inject = ['$routeProvider'];
function routeConfig ($routeProvider) {
  $routeProvider
    .when('/extra/trains', {
      template: '<trains data-package="$resolve.dataPackage"></trains>',
      datapackageUrl: 'components/extra/trains/datapackage.json'
    })
    .when('/extra/hexbin', {
      template: '<hexbin></hexbin>'
    })
    .otherwise({redirectTo: '/'});
}

export default angular
  .module('extra', ['projectX.dataService'])
  .component('trains', trainsComponent)
  .component('extra', indexComponent)
  .component('hexbin', hexbinComponent)
  .config(routeConfig);
