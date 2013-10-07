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

userServices.factory('UserSearch', [
  'User', '$q',
  function(User, $q) {
    return function(username) {
      var delay = $q.defer();
      setTimeout(function() {
        var users = [
          {_id: '1', email: 'user1@monimus.com', username: 'user1'},
          {_id: '2', email: 'user2@monimus.com', username: 'user2'},
          {_id: '3', email: 'user3@monimus.com', username: 'user3'},
          {_id: '4', email: 'user4@monimus.com', username: 'user4'},
          {_id: '5', email: 'user5@monimus.com', username: 'user5'},
          {_id: '6', email: 'user6@monimus.com', username: 'user6'},
          {_id: '7', email: 'user7@monimus.com', username: 'user7'}
        ];
        delay.resolve(users);
      }, 1000);
      return delay.promise;
    };
  }
]);
