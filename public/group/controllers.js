groupModule.controller(
  'GroupMainCtrl',
  [
    '$scope', '$state', 'groups',
    function($scope, $state, groups) {
      $scope.groups = groups;
      $scope.world = groups[0];
    }
  ]);

groupModule.controller(
  'GroupListCtrl',
  [
    '$rootScope', '$scope', '$state',
    function($rootScope, $scope, $state) {

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
          { field: '_id',
            displayName: 'Action',
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
      });
    }
  ]
);

groupModule.controller(
  'GroupViewCtrl',
  [
    '$scope', '$state', 'group', '$log',
    function($scope, $state, group ,$log) {
      $scope.group = group;
      $scope.isDisabled = false;
      if(group.tier == 3){
        $log.log('disableing for tier3');
        $scope.isDisabled = true;
      }


      $scope.edit = function() {
        $state.go('group.edit', { id: $scope.group._id });
      };

      $scope.addSubGroup = function() {
        $state.go('group.subgroup', { id: $scope.group._id });
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
    '$rootScope', '$scope', '$state', 'group','$log',
    function($rootScope, $scope, $state, group,$log) {
      $log.log(group);
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
        { name: 'AAA', action: 'a' },
        { name: 'BBB', action: 'b' },
        { name: 'CCC', action: 'c' }
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
    '$rootScope', '$scope', '$log', '$state', 'group', 'UserSearch',
    function($rootScope, $scope, $log, $state, group, UserSearch) {

      $scope.group = group;

      $scope.members = [
        { name: 'AAA', action: 'a' },
        { name: 'BBB', action: 'b' },
        { name: 'CCC', action: 'c' }
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

      $scope.users = UserSearch('user');

      $scope.$watch('member', function(newVal, oldVal, scope) {
        if ($scope.member && !_.find($scope.members, {action: $scope.member})) {
          $scope.users.then(function(users) {
            var newMember = _.find(users, { '_id': $scope.member.toString() });
            $scope.members.push({ name: newMember.username, action: newMember._id });
          });
        }
      });

    }
  ]
);

groupModule.controller(
  'SubgroupCtrl',
  [
    '$rootScope', '$scope', '$state', 'group','Group','school','course','$log',
    function($rootScope, $scope, $state, group,Group,school,course,$log) {

      var newgroup = new Group({
                'tier': 0,
                'schoolId': null,
                'courseId': null,
                'isHidden': false,
                'isOpenToParent': true,
                'isOpenToAll': true
              });

      $scope.group = newgroup;

      if(school)
        $scope.schoolname = school.name;
      if(course)
        $scope.coursename = course.name;

      if(group.tier == 0){
        $scope.grouptype = 'School / Organization';
        $scope.group.tier = 1;
        $log.log('constructing school');
        $scope.types = [
          { name: '1 - School / Organization',id:1 }
        ];
      }
      else if(group.tier == 1){
        $scope.grouptype = 'Course';
        $scope.group.tier = 2;
        $log.log('constructing course');
        $scope.schoolname = group.name;
        $scope.types = [
          { name: '2 - Course',id:2 }
        ];
      }
      else if(group.tier == 2){
        $scope.grouptype = 'group';
        $scope.group.tier = 3;
        $log.log('constructing group');
        $scope.coursename = group.name;
        $scope.types = [
          { name: '3 - group',id:3 }
        ];
      }
      else{
        $log.log('NO NEED');
        return;
      }

      $scope.save = function() {
        
        if($scope.group.tier == 1){
          $log.log('schools');
        }
        if($scope.group.tier == 2){
          $log.log('courses');
          $scope.group.schoolId = $state.params.id;
        }
        if($scope.group.tier == 3){
          $log.log('groups');
          $scope.group.courseId = $state.params.id;
          $scope.group.schoolId = group.schoolId;
        }

        $scope.group.$save(function(group) {
          //$log.log(group);
          $state.go('group.list');
          $rootScope.$broadcast('groupDataChange', $scope.group);
        });
      };
    }
  ]);
