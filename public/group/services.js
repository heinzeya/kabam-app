var groupServices = angular.module('Group.services', ['ngResource', 'ngGrid']);

groupServices.factory('Group', [
  '$resource',
  function($resource) {
    return $resource('/api/rest/Group/:id', {id: '@id'});
  }
]);

groupServices.factory('GroupLoader', [
  'Group', '$stateParams', '$q',
  function(Group, $stateParams, $q) {
    console.log($stateParams);
    var delay = $q.defer();
    Group.get({id: $stateParams.id}, function(group) {
      delay.resolve(group);
    }, function() {
      delay.reject('Unable to fetch group ' + $stateParams.id);
    });
    return delay.promise;
  }
]);

groupServices.factory('GroupListLoader', [
  'Group', '$q',
  function(Group, $q) {
    var delay = $q.defer();
    Group.query(function(groups) {
      delay.resolve(groups);
    }, function() {
      delay.reject('Unable to fetch groups');
    });
    return delay.promise;
  }
]);
