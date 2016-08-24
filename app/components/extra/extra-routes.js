import angular from 'angular';

// "extra" components
import trainsComponent from './trains/trains';
import hexbinComponent from './hexbin/hexbin';
import extraIndexComponent from './extra-index';

routeConfig.$inject = ['$routeProvider'];
function routeConfig ($routeProvider) {
  $routeProvider
    .when('/extra', {
      template: '<extra data-package="$resolve.dataPackage"></extra>',
      datapackageUrl: 'components/extra/datapackage.json'
    })
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
  .component('extra', extraIndexComponent)
  .component('trains', trainsComponent)
  .component('hexbin', hexbinComponent)
  .config(routeConfig);
