import angular from 'angular';

import aboutHTML from 'components/about/about.md!md';
import errorHTML from 'components/error/error.html!text';

// examples
import indexComponent from './index';
import trainsComponent from './trains/trains';

import 'd3-plugins/hexbin/hexbin';  // needed for /examples/hexbin

routeConfig.$inject = ['$routeProvider'];
function routeConfig ($routeProvider) {
  $routeProvider
    .when('/extra/hexbin', {
      templateUrl: 'components/extra/hexbin/hexbin.html'
    })
    .when('/extra/trains', {
      template: '<trains data-package="$resolve.dataPackage"></trains>',
      datapackageUrl: 'components/extra/trains/datapackage.json'
    })
    .otherwise({redirectTo: '/'});
}

export default angular
  .module('extra', ['projectX.dataService'])
  .component('trains', trainsComponent)
  .component('extra', indexComponent)
  .config(routeConfig);
