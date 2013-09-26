groupModule.controller(
  'GroupMainCtrl',
  [
    '$rootScope', '$scope', '$state',
    function($rootScope, $scope, $state) {
      $state.transitionTo('group.list');
}]);

groupModule.controller(
  'GroupListCtrl',
  [
    '$rootScope', '$scope', '$state', '$q', 'groups', 'Group',
    function($rootScope, $scope, $state, $q, groups, Group) {
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
          { field: 'name' },
          { field: 'uri' },
          { field: 'tier' },
          { field: 'schoolId' },
          { field: 'courseId' },
          { field: 'action',
            enableEditCell: false,
            cellTemplate: linkCellTemplate }
        ]
      };

      $scope.add = function() {
        $state.go('group.new');
      };

      $rootScope.$on('groupDataChange', function(event, updatedGroup) {
        var idx = _.findIndex($scope.groups, { _id: updatedGroup._id });
        if (idx >= 0) {
          $scope.groups[idx] = updatedGroup;
        } else {
          $scope.groups.push(updatedGroup);
        }
        // console.log('event groupUpdate captured', $scope.groups, updatedGroup);
        // $scope.groups.push({_id:'123', 'name': 'test', 'uri': 'bbb'});
        // Group.query(function(groups) {
        //   $scope.groups = groups;
        //   if (!$scope.$$phase) {
        //     $scope.$apply();
        //     console.log('apply');
        //   }
        // });
      });
    }
  ]
);

groupModule.controller(
  'GroupViewCtrl',
  [
    '$scope', '$state', 'group',
    function($scope, $state, group) {
      $scope.group = group;

      $scope.edit = function() {
        $state.go('group.edit', { id: $scope.group._id });
      };

      $scope.addSubGroup = function() {
      };

      $scope.admin = function() {
        $state.go('group.admin', { id: $scope.group._id });
      };

      $scope.member = function() {
        $state.go('group.member', { id: $scope.group._id });
      };

    }
  ]
);

groupModule.controller(
  'GroupEditCtrl',
  [
    '$rootScope', '$scope', '$state', 'group',
    function($rootScope, $scope, $state, group) {

      $scope.group = group;

      $scope.save = function() {
        if ($scope.group.schoolId === '') {
          $scope.group.schoolId = null;
        }
        if ($scope.group.courseId === '') {
          $scope.group.courseId = null;
        }
        $scope.group.$save(function(group) {
          $state.go('group.list');
          $rootScope.$broadcast('groupDataChange', $scope.group);
        });
      };

      $scope.tierOptions = {
        width: 'element',
        'minimumResultsForSearch': -1
      };

      $scope.schoolOptions = {
        width: 'element'
      };

      $scope.courseOptions = {
        width: 'element'
      };

    }
  ]
);

groupModule.controller(
  'GroupAdminCtrl',
  [
    '$rootScope', '$scope', '$state', 'group',
    function($rootScope, $scope, $state, group) {

      $scope.group = group;

      $scope.admins = [
        { name: 'AAA', action: '0' },
        { name: 'BBB', action: '1' },
        { name: 'CCC', action: '2' }
      ];

      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/group/admin/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/group/admin/remove/{{row.getProperty(col.field)}}">Remove</a>' +
            '</div>';

      $scope.gridOptions = {
        data: 'admins',
        enableRowSelection: true,
        selectedItems: $scope.selectedItems,
        columnDefs: [
          { field: 'name' },
          { field: 'action',
            enableEditCell: false,
            cellTemplate: linkCellTemplate }
        ]
      };

    }
  ]
);

groupModule.controller(
  'GroupMemberCtrl',
  [
    '$rootScope', '$scope', '$state', 'group',
    function($rootScope, $scope, $state, group) {

      $scope.group = group;

      $scope.members = [
        { name: 'AAA', action: '0' },
        { name: 'BBB', action: '1' },
        { name: 'CCC', action: '2' }
      ];

      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/group/member/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/group/member/remove/{{row.getProperty(col.field)}}">Remove</a>' +
            '</div>';

      $scope.gridOptions = {
        data: 'members',
        enableRowSelection: true,
        selectedItems: $scope.selectedItems,
        columnDefs: [
          { field: 'name' },
          { field: 'action',
            enableEditCell: false,
            cellTemplate: linkCellTemplate }
        ]
      };

    }
  ]
);
