//=require ./services.js
//=require_self
//=require ./controllers.js

var groupModule = angular.module('KabamGroup',
                                 ['Group.services',
                                  'User.services',
                                  'ui.router',
                                  'ui.bootstrap',
                                  'ui.select2',
                                  'kabam.states'
                                 ]);

groupModule.config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {
    kabamStatesProvider
      .push([
        {
          name: 'group',
          url: '/group',
          templateUrl: '/assets/group/views/index.html',
          controller: 'GroupMainCtrl',
          resolve: {
            groups: function(GroupListLoader) {
              return GroupListLoader();
            }
          }
        },
        {
          name: 'group.list',
          url: '/list',
          templateUrl: '/assets/group/views/list.html',
          controller: 'GroupListCtrl'
        },
        {
          name: 'group.view',
          url: '/view/:id',
          templateUrl: '/assets/group/views/view.html',
          controller: 'GroupViewCtrl',
          resolve: {
            group: function(GroupLoader, $stateParams) {
              return GroupLoader($stateParams.id);
            }
          }
        },
        {
          name: 'group.new',
          url: '/new',
          templateUrl: '/assets/group/views/edit.html',
          controller: 'GroupEditCtrl',
          resolve: {
            'group': function(Group) {
              return new Group({
                'tier': 0,
                'schoolId': null,
                'courseId': null,
                'isHidden': false,
                'isOpenToParent': true,
                'isOpenToAll': true
              });
            }
          }
        },
        {
          name: 'group.edit',
          url: '/edit/:id',
          templateUrl: '/assets/group/views/edit.html',
          controller: 'GroupEditCtrl',
          resolve: {
            group: function(GroupLoader, $stateParams) {
              return GroupLoader($stateParams.id);
            }
          }
        },
        {
          name: 'group.admin',
          url: '/:id/admin',
          templateUrl: '/assets/group/views/admin.html',
          controller: 'GroupAdminCtrl',
          resolve: {
            group: function(GroupLoader, $stateParams) {
              return GroupLoader($stateParams.id);
            }
          }
        },
        {
          name: 'group.member',
          url: '/:id/member',
          templateUrl: '/assets/group/views/member.html',
          controller: 'GroupMemberCtrl',
          resolve: {
            group: function(GroupLoader, $stateParams) {
              return GroupLoader($stateParams.id);
            }
          }
        },
        {
          name: 'group.subgroup',
          url: '/:id/subgroup',
          templateUrl: '/assets/group/views/subgroup.html',
          controller: 'SubgroupCtrl',
          resolve: {
            group: function(GroupLoader, $stateParams) {
              return GroupLoader($stateParams.id);
            },
            school: function(GroupLoader,group,$log){
                if(group.schoolId == null)
                  return null;
                return GroupLoader(group.schoolId);
            },
            course: function(GroupLoader,group,$log){               
                if(group.courseId == null)
                  return null;
                return GroupLoader(group.courseId);
            }
          }
        }

      ]);
  }
]);
