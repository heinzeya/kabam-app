var groupServices = angular.module('Group.services', ['ngResource', 'ngGrid']);

groupServices.factory('Group', [
  '$resource',
  function($resource) {
//    return $resource('/api/group/:id', {id: @id});
    return { _id: 1, name: 'Group 1' };
  }
]);

groupServices.factory('GroupLoader', [
  'Group', '$routeParams',
  function(Group, $routeParams) {
    console.log('id', $routeParams);
    return { _id: 1, name: 'Group 1' };
  }
]);

groupServices.factory('GroupListLoader', [
  'Group',
  function(Group) {
    return [
      { _id: 1, name: 'Group 1' },
      { _id: 2, name: 'Group 2' }
    ];
  }
]);
