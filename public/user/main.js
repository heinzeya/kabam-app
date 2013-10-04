//=require ./services.js
//=require_self
//=require ./controllers.js

var userModule = angular.module('KabamUser',
                                 ['User.services',
                                  'ui.router',
                                  'ui.bootstrap',
                                  'ui.select2',
                                  'kabam.states'
                                 ]);

userModule.config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {
    kabamStatesProvider
      .push([
        {
          name: 'user',
          url: '/user',
          templateUrl: '/assets/user/views/index.html',
          controller: 'UserMainCtrl',
          resolve: {
            users: function(UserListLoader) {
              return UserListLoader();
            }
          }
        },
        {
          name: 'user.list',
          url: '/list',
          templateUrl: '/assets/user/views/list.html',
          controller: 'UserListCtrl'
        },
        {
          name: 'user.view',
          url: '/view/:id',
          templateUrl: '/assets/user/views/view.html',
          controller: 'UserViewCtrl',
          resolve: {
            user: function(UserLoader, $stateParams) {
              return UserLoader($stateParams.id);
            }
          }
        },
        {
          name: 'user.new',
          url: '/new',
          templateUrl: '/assets/user/views/edit.html',
          controller: 'UserEditCtrl',
          resolve: {
            'user': function(User) {
              return new User({
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
          name: 'user.edit',
          url: '/edit/:id',
          templateUrl: '/assets/user/views/edit.html',
          controller: 'UserEditCtrl',
          resolve: {
            user: function(UserLoader, $stateParams) {
              return UserLoader($stateParams.id);
            }
          }
        }

      ]);
  }
]);
