import angular from 'angular';

import aboutHTML from 'components/about/about.md!md';
import errorHTML from 'components/error/error.html!text';

// examples
import indexComponent from 'components/index';
import barsComponent from 'components/bars/bars';
import trainsComponent from 'components/trains/trains';

import 'd3-plugins/hexbin/hexbin';  // needed for /examples/hexbin

export default angular
  .module('examples', ['projectX.dataService'])
  .component('bars', barsComponent)
  .component('trains', trainsComponent)
  .component('index', indexComponent)
  .config(['$routeProvider', $routeProvider => {
    $routeProvider
      .when('/', {
        template: '<index data-package="$resolve.dataPackage"></index>',
        datapackageUrl: 'components/datapackage.json'
      })
      .when('/about', {
        template: aboutHTML
      })
      .when('/error', {
        template: errorHTML
      })
      .when('/404', {
        template: errorHTML
      })
      .when('/bars', {
        template: '<bars data-package="$resolve.dataPackage"></bars>',
        datapackageUrl: 'components/bars/datapackage.json'
      })
      .when('/hexbin', {
        templateUrl: 'components/hexbin/hexbin.html'
      })
      .when('/trains', {
        template: '<trains data-package="$resolve.dataPackage"></trains>',
        datapackageUrl: 'components/trains/datapackage.json'
      });
  }]);
