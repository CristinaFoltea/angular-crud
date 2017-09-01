'use strict';

console.log(this);

angular.module('angular-crud')
  .controller('homeController', ['$scope', '$location', 'BaseService','$window', function ($scope, $location, BaseService, $window) {
    var baseUrl = $location.absUrl();
    var _helper = {

      createCategories : function (items) {
        items.forEach(function (item) {
          item.category.forEach(function (cat) {
              if(cat && $scope.categories.indexOf(cat.toLowerCase()) == -1){
                $scope.categories.push(cat.toLowerCase())
              }
            })
        });
        $window.localStorage.setItem("categories", JSON.stringify($scope.categories))
      },

      createTypes : function (items) {
        items.forEach(function (item) {
            if(item.media_type && $scope.types.indexOf(item.media_type.toLowerCase()) == -1){
              $scope.types.push(item.media_type.toLowerCase())
            }
        });
        $window.localStorage.setItem("types", JSON.stringify($scope.types))
      }
    }
    var controller = {
      init: function(){
        controller.setDefaults();
        controller.setWatches();
        controller.bindEvents();
        controller.getData();
      },

      setDefaults : function () {
        $scope.categories = [];
        $scope.types = [];
        $scope.getData = controller.getData;
      },

      getData : function () {
        BaseService.get(baseUrl + "api/resources").then(function (response) {
          $scope.items = response.data;
          $scope.loadingData = false;
          _helper.createCategories($scope.items);
          _helper.createTypes($scope.items);
        }, function (error) {
          console.log(error);
        })
      },

      scope : {

      }
    };


    controller.init();

  }
]);
