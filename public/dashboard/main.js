var dashboardModule = angular.module('Dashboard',
  [
    'kabam.states', 'ui.calendar'
  ]);

dashboardModule.config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {
    kabamStatesProvider
      .push([
        {
          name: 'dashboard',
          url: '/dashboard',
          templateUrl: '/assets/dashboard/views/index.html',
          controller: 'DemoCtrl'
        }
      ]);
  }
]);

dashboardModule.controller('DemoCtrl', ['$scope', function($scope) {
  /* config object */
  $scope.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      dayClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };
}]);
