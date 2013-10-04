var userServices = angular.module('User.services', ['ngResource', 'ngGrid', 'ui.router']);

userServices.factory('User', [
  '$resource',
  function($resource) {
    return $resource('/api/rest/User/:id', {id: '@id'});
  }
]);

userServices.factory('UserLoader', [
  'User', '$q',
  function(User, $q) {
    return function(id) {
      var delay = $q.defer();
      User.get({id: id}, function(user) {
        delay.resolve(user);
      }, function() {
        delay.reject('Unable to fetch user ' + id);
      });
      return delay.promise;
    };
  }
]);

userServices.factory('UserListLoader', [
  'User', '$q',
  function(User, $q) {
    return function() {
      var delay = $q.defer();
      User.query(function(users) {
        delay.resolve(users);
      }, function() {
        delay.reject('Unable to fetch users');
      });
      return delay.promise;
    };
  }
]);
