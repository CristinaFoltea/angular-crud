'use strict';

angular.module('angular-crud')
       .service('BaseService', [ '$http', '$q', '$log', function( $http, $q, $log) {

  var service = {
    get: function(url) {
      var deferred = $q.defer();
      $http.get(url)
           .then(function(data) {
              deferred.resolve(data);
            })
            .catch( function (error) {
              deferred.reject(error);
            })
      return deferred.promise;
    },

    post: function(url, data) {
      var deferred = $q.defer();
      $http.post(url, data)
        .then(function(data) {
           deferred.resolve(data);
         })
         .catch( function (error) {
           deferred.reject(error);
         })
      return deferred.promise;
    },

    patch: function(url, data) {
      var deferred = $q.defer();
      $http.patch(url, data)
        .then(function(data) {
           deferred.resolve(data);
         })
         .catch( function (error) {
           deferred.reject(error);
         })

      return deferred.promise;
    },

    delete: function(url) {
        var deferred = $q.defer();
        $http.delete(url)
          .then(function(data) {
             deferred.resolve(data);
           })
           .catch( function (error) {
             deferred.reject(error);
           })

        return deferred.promise;
    }
  };


  return service;

}]);
