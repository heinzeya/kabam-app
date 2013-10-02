var courseModule = angular.module('Course',
  [
    'kabam.states'
  ]);

courseModule.config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {
    kabamStatesProvider
      .push([
        {
          name: 'course',
          url: '/course',
          templateUrl: '/assets/course/views/index.html'
        }
      ]);
  }
]);
