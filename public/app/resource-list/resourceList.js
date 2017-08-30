'use strict';

angular.module('angular-crud')
  .directive('resourceList', [ function() {
    return {
      restrict: 'E',
      templateUrl: 'app/resource-list/resource-list-template.html',
      replace: true,
      scope: {
        items: '=?',
        types : "="
      },

      link: function(scope, element, attrs) {
        var link = {
          init: function() {
            link.setScope();
          },

          setScope: function(){
            for(var property in link.scope){
              scope[property] = link.scope[property];
            }
          },

          scope: {

          }
        };
      }

    };
  }
]);
