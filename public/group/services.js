var groupServices = angular.module('Group.services', ['restangular', 'ngGrid', 'ui.router']);

groupServices.factory('GroupService', [
  'Restangular',
  function(Restangular) {
    var _groupService = Restangular.all('Group');
    return {

      getGroups: function() {
        return _groupService.getList();
      },

      getGroup: function(id) {
        return _groupService.get(id);
      },

      postGroup: function(group) {
        return _groupService.post(group);
      }

    };
  }
]);
