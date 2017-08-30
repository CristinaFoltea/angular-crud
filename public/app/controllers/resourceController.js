'use strict';

angular.module('angular-crud')
  .controller('resourceController', ['$scope', '$location', '$window', 'BaseService', function ($scope, $location, $window, BaseService) {
    var urlId = $location.path();
    var baseUrl = ($location.absUrl().split(urlId))[0];

    var controller = {
      init: function(){
        controller.setDefaults();
        controller.setWatches();
        controller.bindEvents();
        if (!$scope.newEntry) controller.getDataById();
      },

      setDefaults : function () {
        $scope.categories = JSON.parse($window.localStorage.getItem("categories")) || [];
        $scope.types = JSON.parse($window.localStorage.getItem("types")) || [];
        $scope.newEntry = urlId === "/new-entry";
        $scope.saveEntry = controller.saveEntry;
        $scope.updateEntry = controller.updateEntry;
        $scope.removeEntry = controller.removeEntry;

      },

      getDataById : function () {
        BaseService.get(baseUrl + "/api/resources" + urlId).then(function (response) {
            $scope.item = response.data;
        }, function (error) {
          console.log(error);
        })
      },

      saveEntry : function (data) {
        BaseService.post(baseUrl + "/api/resources", data).then(function (response) {
          console.log(response);
          $location.path('/');
        }, function (error) {
          throw error
        })
      },

      updateEntry : function (data) {
        BaseService.patch(baseUrl + "/api/resources" + urlId, data).then(function (response) {
          $location.path('/');
        }, function (error) {
          throw error
        })
      },

      removeEntry : function (id) {
        BaseService.delete(baseUrl + "/api/resources/" + id).then(function (response) {
          $location.path('/');
        }, function (error) {
          console.log(error);
        })
      },

      setWatches: function () {
        $scope.$on('updateEntry', function(event, data) {
          $scope.newEntry ? $scope.saveEntry(data) : $scope.updateEntry(data);
        });

        $scope.$on('removeEntry', function(event, id) {
          $scope.removeEntry(id);
        });
      },

      bindEvents: function(){

      }
    };


    controller.init();

  }
]);
