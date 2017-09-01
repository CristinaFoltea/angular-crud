'use strict';

angular.module('angular-crud', ['ngRoute'])
  .config(['$locationProvider', function($locationProvider) {
    //  redirect hash to hashbang
    var url = window.location.toString();
    if (url.split('#!').length == 1) {
      if (url.split('#').length == 2) {
        var splt = url.split('#');
        window.location = splt[0] +'#!'+ splt[1];
      }
    }

    $locationProvider.html5Mode(false).hashPrefix('!');
  }])
  .config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider)
  {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/home.html',
        controller : 'homeController'
      })
      .when('/:id', {
        templateUrl: 'pages/resource.html',
        controller : 'resourceController'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
        });
  }]);
