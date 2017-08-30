'use strict';

angular.module('angular-crud')
  .directive('resourceEntry', ["$location", function($location) {
    return {
      restrict: 'E',
      templateUrl: 'app/resource-entry/resource-entry-template.html',
      replace: true,
      scope: {
        item: '=?',
        mediaTypes: '=',
        allCategories: "=",
        newEntry: "="
      },

      link: function(scope, element, attrs) {
        var link = {
          init: function() {
            link.setScope();
            link.setDefault();
            link.setWatches();
          },

          setScope: function(){
            for(var property in link.scope){
              scope[property] = link.scope[property];
            }
          },

          setDefault : function () {
            scope.prepopulated = scope.newEntry ? false : true;
            scope.data = {};
            scope.initData = true;
            if (scope.newEntry) {
              scope.item = {};
              scope.item.category = []
            }
          },

          setWatches : function () {
            scope.$watch('item.category', function (newVal, oldVal) {  ///waiting for the promise to be resolved
              if (newVal !== oldVal) {
                scope.data.category = newVal;
              }
            }, true)
          },

          scope: {
            submitForm : function () {
              console.log("clicked");
              scope.$emit('updateEntry', scope.data)
            },

            deleteEntry : function (id) {
              scope.$emit('removeEntry', id);
            },
            removeCheckbox : function (value) {
              if (scope.item.category.indexOf(value) !== -1 ) {
                var index = scope.item.category.indexOf(value);
                scope.item.category.splice(index, 1);
              }
            },
            addCheckbox : function (value) {
              if (scope.item.category.indexOf(value) == -1 ) {
                scope.item.category.push(value);
              }
            },

            addNewBox : function (value) {
              scope.newBox = '';
              scope.item.category.push(value);
            },

            cancel : function () {
              $location.path('/')
            }
          }
        };
        link.init();
      }
    };
  }
]);
