//=require ./services.js
//=require_self
//=require ./controllers.js

var userModule = angular.module('KabamUser',
                                 ['restangular',
                                  'User.services',
                                  'ui.router',
                                  'ui.bootstrap',
                                  'ui.select2',
                                  'kabam.states'
                                 ]);

userModule.config([
  'kabamStatesProvider', 'RestangularProvider',
  function(kabamStatesProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/rest');
    kabamStatesProvider
      .push([
        {
          name: 'user',
          url: '/user',
          templateUrl: '/assets/user/views/index.html',
          controller: 'UserMainCtrl',
          resolve: {
            users: function(UserService) {
              return UserService.getUsers();
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
            user: function(UserService, $stateParams) {
              return UserService.getUser($stateParams.id);
            }
          }
        },
        {
          name: 'user.new',
          url: '/new',
          templateUrl: '/assets/user/views/edit.html',
          controller: 'UserEditCtrl',
          resolve: {
            'user': function() {
              return null;
            }
          }
        },
        {
          name: 'user.edit',
          url: '/edit/:id',
          templateUrl: '/assets/user/views/edit.html',
          controller: 'UserEditCtrl',
          resolve: {
            user: function(UserService, $stateParams) {
              return UserService.getUser($stateParams.id);
            }
          }
        }

      ]);
  }
]);
