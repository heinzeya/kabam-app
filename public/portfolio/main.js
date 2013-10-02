var portfolioModule = angular.module('Portfolio',
  [
    'kabam.states'
  ]);

portfolioModule.config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {
    kabamStatesProvider
      .push([
        {
          name: 'portfolio',
          url: '/portfolio',
          templateUrl: '/assets/portfolio/views/index.html'
        }
      ]);
  }
]);
