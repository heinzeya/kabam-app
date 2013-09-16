groupModule.controller(
  'GroupListCtrl',
  [
    '$scope', '$location', 'groups',
    function($scope, $location, groups) {
      $scope.groups = groups;
      $scope.groupRows = groups.map(function(group) {
        group['action'] = group._id;
      });
      $scope.selectedItems = [];
      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/group/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/group/edit/{{row.getProperty(col.field)}}">Edit</a>' +
            '</div>';
      $scope.gridOptions = {
        data: 'groups',
        enableRowSelection: true,
        selectedItems: $scope.selectedItems,
        columnDefs: [
          { field: '_id', displayName: 'ID' },
          { field: 'name' },
          { field: 'action',
            enableEditCell: false,
            cellTemplate: linkCellTemplate }
        ]
      };
      $scope.add = function() {
        $location.path('/group/new');
      };

      $scope.$on('ngGridEventData', function (event, data) {
        console.log($scope.groupList);
        //$scope.groupList.selectRow(0, true);
      });
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
