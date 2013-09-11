groupModule.controller(
  'GroupListCtrl',
  [
    '$scope', 'groups',
    function($scope, groups) {
      $scope.groups = groups;
      $scope.groupList = { data: 'groups' };
    }
  ]
);

groupModule.controller(
  'GroupViewCtrl',
  [
    '$scope', '$location', 'group',
    function($scope, $location, group) {
      $scope.group = group;

      console.log('group.id', group._id);
      $scope.edit = function() {
        $location.path('/group/edit/' + group._id);
      };
    }
  ]
);

groupModule.controller(
  'GroupEditCtrl',
  [
    '$scope', '$location', 'group',
    function($scope, $location, group) {
      $scope.group = group;

      console.log('group.id', group._id);
      $scope.save = function() {
        $scope.group.$save(function(group) {
          $location.path('/group/edit/' + group._id);
        });
      };
  }]
);
