angular.module('Dashboard.states').config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {
    kabamStatesProvider
      .push([
        {
          name: 'dashboard',
          url: '/dashboard',
          templateUrl: '/assets/dashboard/views/index.html',
          controller: 'MainCtrl',
          resolve: {
            events: function(eventService) {
              return eventService.getEvents();
            }
          }
        }
      ]);
  }
]);
