//=require ./services.js
//=require_self
//=require ./controllers.js

var groupModule = angular.module('Group', ['Group.services']);

groupModule.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('groupList', {
        url: '/group/list',
        templateUrl: '/assets/group/views/list.html',
        controller: 'GroupListCtrl',
        resolve: {
          groups: function(GroupListLoader) {
            return GroupListLoader;
          }
        }
      })
    .state('groupView', {
      url: '/group/view/:id',
      templateUrl: '/assets/group/views/view.html',
      controller: 'GroupViewCtrl',
      resolve: {
        group: function(GroupLoader) {
          return GroupLoader;
        }
      }
      })
    .state('groupEdit', {
      url: '/group/edit/:id',
      templateUrl: '/assets/group/views/edit.html',
      controller: 'GroupEditCtrl',
      resolve: {
        group: function(GroupLoader) {
          return GroupLoader;
        }
      }
    });
  }
]);
