//=require ./services.js
//=require_self
//=require ./controllers.js

var groupModule = angular.module('KabamGroup',
                                 ['Group.services',
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
          controller: 'GroupMainCtrl'
        },
        {
          name: 'group.list',
          url: '/list',
          templateUrl: '/assets/group/views/list.html',
          controller: 'GroupListCtrl',
          resolve: {
            'groups': function(GroupListLoader) {
              return GroupListLoader;
            }
          }
        },
        {
          name: 'group.view',
          url: '/view/:id',
          templateUrl: '/assets/group/views/view.html',
          controller: 'GroupViewCtrl',
          resolve: {
            group: function(Group, $stateParams, $q) {
              var delay = $q.defer();
              Group.get({id: $stateParams.id}, function(group) {
                delay.resolve(group);
              }, function() {
                delay.reject('Unable to fetch group ' + $stateParams.id);
              });
              return delay.promise;
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
            group: function(Group, $stateParams, $q) {
              var delay = $q.defer();
              Group.get({id: $stateParams.id}, function(group) {
                delay.resolve(group);
              }, function() {
                delay.reject('Unable to fetch group ' + $stateParams.id);
              });
              return delay.promise;
            }
          }
        }
      ]);
  }
]);
