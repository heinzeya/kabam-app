var groupServices = angular.module('Group.services', ['ngResource', 'ngGrid', 'ui.router']);

groupServices.factory('Group', [
  '$resource',
  function($resource) {
    return $resource('/api/rest/Group/:id', {id: '@id'});
  }
]);

groupServices.factory('GroupLoader', [
  'Group', '$q',
  function(Group, $q) {
    return function(id) {
      var delay = $q.defer();
      Group.get({id: id}, function(group) {
        delay.resolve(group);
      }, function() {
        delay.reject('Unable to fetch group ' + id);
      });
      return delay.promise;
    };
  }
]);

groupServices.factory('GroupListLoader', [
  'Group', '$q',
  function(Group, $q) {
    return function() {
      var delay = $q.defer();
      Group.query(function(groups) {
        delay.resolve(groups);
      }, function() {
        delay.reject('Unable to fetch groups');
      });
      return delay.promise;
    };
  }
]);
