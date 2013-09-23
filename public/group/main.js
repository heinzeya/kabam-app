//=require ./services.js
//=require_self
//=require ./controllers.js

var groupModule = angular.module('KabamGroup', ['Group.services', 'ui.router', 'kabam.states']);

groupModule.config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {
    kabamStatesProvider
      .push([
        {
          name: 'groupTest',
          url: '/group/test',
          template: '<h3>hello</h3>',
          controller: function() {
            console.log('test ctrl');
          }
        },
        {
          name: 'groupList',
          url: '/group/list',
          templateUrl: '/assets/group/views/list.html',
          controller: 'GroupListCtrl',
          resolve: {
            'groups': function(GroupListLoader) {
              return GroupListLoader;
            }
          }
        },
        {
          name: 'groupView',
          url: '/group/view/:id',
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
          name: 'groupNew',
          url: '/group/new',
          templateUrl: '/assets/group/views/edit.html',
          controller: 'GroupEditCtrl',
          resolve: {
            'group': function(Group) {
              return new Group({
                'tier': 0,
                'schoolId': null,
                'courseId': null,
                'isHidden': false,
                'isOpenForParent': true,
                'isOpenForAll': true
              });
            }
          }
        },
        {
          name: 'groupEdit',
          url: '/group/edit/:id',
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
